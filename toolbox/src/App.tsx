import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 py-3 bg-white dark:bg-gray-800">
        <CategoryTabs />
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 bg-gray-50 dark:bg-gray-900">
        <ToolGrid />
      </main>
      <Footer />

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
