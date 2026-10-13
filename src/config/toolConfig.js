import TodoTool from '../components/tools/TodoTool';
import PomodoroTool from '../components/tools/PomodoroTool';
import ProfileTool from '../components/tools/ProfileTool';
import SettingsTool from '../components/tools/SettingsTool';
import IntentionsTool from '../components/tools/IntentionsTool';
import JournalTool from '../components/tools/JournalTool';

export const TOOL_CONFIG = [
  {
    id: 'intentions',
    label: 'Intentions',
    icon: '✨',
    component: IntentionsTool,
    color: 'bg-cozy-amber',
    order: 1,
  },
  {
    id: 'todos',
    label: 'Tasks',
    icon: '📝',
    component: TodoTool,
    color: 'bg-cozy-terracotta',
    order: 2,
  },
  {
    id: 'pomodoro',
    label: 'Focus',
    icon: '⏳',
    component: PomodoroTool,
    color: 'bg-cozy-sage',
    order: 3,
  },
  {
    id: 'journal',
    label: 'Journal',
    icon: '📖',
    component: JournalTool,
    color: 'bg-cozy-deep',
    order: 4,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    component: ProfileTool,
    color: 'bg-cozy-amber',
    order: 5,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    component: SettingsTool,
    color: 'bg-gray-500',
    order: 6,
  },
];
