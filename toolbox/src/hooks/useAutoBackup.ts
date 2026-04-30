import { useEffect, useCallback, useState, useRef } from 'react';
import { Tool, Category } from '../types';

const AUTO_BACKUP_FILENAME = 'toolbox-auto-backup.json';
const BACKUP_HANDLE_KEY = 'toolbox_backup_handle';

interface AutoBackupState {
  isEnabled: boolean;
  backupPath: string | null;
  lastBackupTime: number | null;
}

export function useAutoBackup(tools: Tool[], categories: Category[]) {
  const [backupState, setBackupState] = useState<AutoBackupState>({
    isEnabled: false,
    backupPath: null,
    lastBackupTime: null,
  });
  
  const fileHandleRef = useRef<FileSystemFileHandle | null>(null);
  const isBackupPending = useRef(false);
  const backupTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveBackup = useCallback(async (handle?: FileSystemFileHandle) => {
    if (!window.showSaveFilePicker && !handle) {
      return false;
    }

    try {
      let fileHandle: FileSystemFileHandle;

      if (handle) {
        fileHandle = handle;
      } else if (fileHandleRef.current) {
        fileHandle = fileHandleRef.current;
      } else {
        fileHandle = await window.showSaveFilePicker({
          suggestedName: AUTO_BACKUP_FILENAME,
          types: [
            {
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] },
            },
          ],
        });
        fileHandleRef.current = fileHandle;
      }

      const data = {
        version: 'v1',
        savedAt: Date.now(),
        tools,
        categories,
      };

      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();

      const handleInfo = JSON.stringify({
        name: fileHandle.name,
      });
      sessionStorage.setItem(BACKUP_HANDLE_KEY, handleInfo);

      setBackupState({
        isEnabled: true,
        backupPath: fileHandle.name,
        lastBackupTime: Date.now(),
      });

      return true;
    } catch (error) {
      console.error('Failed to save backup:', error);
      return false;
    }
  }, [tools, categories]);

  const enableAutoBackup = useCallback(async () => {
    if (!window.showSaveFilePicker) {
      return false;
    }

    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: AUTO_BACKUP_FILENAME,
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

      fileHandleRef.current = fileHandle;
      const success = await saveBackup(fileHandle);
      
      if (success) {
        await window.navigator.storage.persist();
      }

      return success;
    } catch (error) {
      console.error('Failed to enable auto backup:', error);
      return false;
    }
  }, [saveBackup]);

  const disableAutoBackup = useCallback(() => {
    sessionStorage.removeItem(BACKUP_HANDLE_KEY);
    fileHandleRef.current = null;
    setBackupState({
      isEnabled: false,
      backupPath: null,
      lastBackupTime: null,
    });
    if (backupTimeout.current) {
      clearTimeout(backupTimeout.current);
      backupTimeout.current = null;
    }
  }, []);

  const restoreFromBackup = useCallback(async (): Promise<{ tools: Tool[]; categories: Category[] } | null> => {
    if (!window.showOpenFilePicker) {
      return null;
    }

    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

      fileHandleRef.current = handle;

      const file = await handle.getFile();
      const content = await file.text();
      const data = JSON.parse(content);

      if (data.tools && data.categories) {
        const handleInfo = JSON.stringify({
          name: handle.name,
        });
        sessionStorage.setItem(BACKUP_HANDLE_KEY, handleInfo);

        setBackupState({
          isEnabled: true,
          backupPath: handle.name,
          lastBackupTime: Date.now(),
        });

        return data;
      }

      return null;
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (backupState.isEnabled && !isBackupPending.current) {
      isBackupPending.current = true;
      
      if (backupTimeout.current) {
        clearTimeout(backupTimeout.current);
      }

      backupTimeout.current = setTimeout(async () => {
        try {
          await saveBackup();
        } finally {
          isBackupPending.current = false;
        }
      }, 500);
    }

    return () => {
      if (backupTimeout.current) {
        clearTimeout(backupTimeout.current);
      }
    };
  }, [tools, categories, backupState.isEnabled, saveBackup]);

  useEffect(() => {
    const storedHandle = sessionStorage.getItem(BACKUP_HANDLE_KEY);
    if (storedHandle) {
      try {
        const info = JSON.parse(storedHandle);
        setBackupState(prev => ({
          ...prev,
          isEnabled: true,
          backupPath: info.name,
        }));
      } catch (error) {
        console.error('Failed to parse stored backup handle:', error);
      }
    }
  }, []);

  return {
    backupState,
    enableAutoBackup,
    disableAutoBackup,
    restoreFromBackup,
    saveBackup,
  };
}
