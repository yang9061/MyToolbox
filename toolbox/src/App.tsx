import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ToolGrid } from './components/ToolGrid';
import { Footer } from './components/Footer';
import { ToolDialog } from './components/ToolDialog';
import { CategoryDialog } from './components/CategoryDialog';
import { ExportDialog } from './components/ExportDialog';
import { ImportDialog } from './components/ImportDialog';
import { ConfirmDialog } from './components/ConfirmDialog';
import { SettingsDialog } from './components/SettingsDialog';
import { AutoBackupPrompt } from './components/AutoBackupPrompt';
import { Toast } from './components/Toast';

function AppContent() {
  const [sidebarWidth, setSidebarWidth] = useState(224);

  return (
    <div className="min-h-screen flex">
      <Sidebar onWidthChange={setSidebarWidth} />
      <div className="flex-1 min-h-screen transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 px-6 py-6 bg-gray-50 dark:bg-gray-900">
            <ToolGrid />
          </main>
          <Footer />
        </div>
      </div>

      <ToolDialog />
      <ToolDialog isEdit />
      <CategoryDialog />
      <ExportDialog />
      <ImportDialog />
      <ConfirmDialog />
      <SettingsDialog />
      <AutoBackupPrompt />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;