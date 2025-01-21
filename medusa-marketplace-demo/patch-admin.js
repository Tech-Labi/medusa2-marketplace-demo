const fs = require('fs');
const path = require('path');

// Paths to files
const appMjsPath = path.join(__dirname, 'node_modules', '@medusajs', 'dashboard', 'dist', 'app.mjs');
const viteCachePath = path.join(__dirname, 'node_modules', '@medusajs', 'admin-bundler', 'node_modules', '.vite');

try {
    // Read the file content
    let fileContent = fs.readFileSync(appMjsPath, 'utf8');

    // Split the file into lines
    const lines = fileContent.split('\n');

    // Modify specific lines (2738, 2739, 2740)
    const newCode = `var MainLayout=()=>{const impersonateKey="IMPERSIONATED_AS";const removeImpersonate=async()=>{localStorage.removeItem(impersonateKey);await fetch("/admin/impersonate-reset");window.location.href="/app"};const impersionatedAs=localStorage.getItem(impersonateKey);const children=[];if(impersionatedAs){children.push(jsx14("div",{className:"flex justify-between bg-ui-tag-purple-icon px-2 py-1 h-8 text-ui-fg-on-inverted",children:[jsx14("p",{children:\`Impersonated as \${impersionatedAs}\`}),jsx14("button",{onClick:removeImpersonate,className:"border border-ui-tag-neutral-border px-2",children:"Remove Impersonation"})]}));}children.push(jsx14(Shell,{children:jsx14(MainSidebar,{})}));return jsx14("div",{children});};`;
    lines[2737] = newCode; // Line 2738 (array index 2737)
    lines[2738] = '';      // Clear line 2739
    lines[2739] = '';      // Clear line 2740

    // Write the modified content back to the file
    fs.writeFileSync(appMjsPath, lines.join('\n'), 'utf8');
    console.log('Updated app.mjs successfully.');

    // Remove Vite cache
    if (fs.existsSync(viteCachePath)) {
        fs.rmSync(viteCachePath, { recursive: true, force: true });
        console.log('Vite cache cleared successfully.');
    } else {
        console.log('Vite cache directory not found.');
    }
} catch (error) {
    console.error('Error processing files:', error);
}