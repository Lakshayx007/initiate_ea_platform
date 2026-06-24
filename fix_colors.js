const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Replace hardcoded dark mode colors with semantic theme colors
content = content.replace(/bg-black text-white/g, 'bg-background text-surface-200');
content = content.replace(/text-white/g, 'text-surface-50');
content = content.replace(/bg-white\/5/g, 'bg-surface-800/50');
content = content.replace(/bg-white\/10/g, 'bg-surface-700');
content = content.replace(/bg-white\/\[0\.02\]/g, 'bg-surface-950');
content = content.replace(/border-white\/10/g, 'border-surface-800');
content = content.replace(/border-white\/\[0\.05\]/g, 'border-surface-800');
content = content.replace(/text-gray-300/g, 'text-surface-300');
content = content.replace(/text-gray-400/g, 'text-surface-400');
content = content.replace(/text-gray-500/g, 'text-surface-500');
content = content.replace(/text-gray-600/g, 'text-surface-600');
content = content.replace(/text-gray-700/g, 'text-surface-700');
content = content.replace(/from-gray-700/g, 'from-surface-700');
content = content.replace(/to-gray-700/g, 'to-surface-700');

fs.writeFileSync('app/page.tsx', content);
