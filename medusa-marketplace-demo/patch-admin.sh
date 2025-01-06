# add Impersonate block
sed -i '' '2738s/.*//' node_modules/@medusajs/dashboard/dist/app.mjs
sed -i '' '2739s/.*//' node_modules/@medusajs/dashboard/dist/app.mjs
sed -i '' '2740s/.*//' node_modules/@medusajs/dashboard/dist/app.mjs
sed -i '' '2738s|.*|var MainLayout=()=>{const impersonateKey="IMPERSIONATED_AS";const removeImpersonate=async()=>{localStorage.removeItem(impersonateKey);await fetch("/admin/impersonate-reset");window.location.href="/app"};const impersionatedAs=localStorage.getItem(impersonateKey);const children=[];if(impersionatedAs){children.push(jsx14("div",{className:"flex justify-between bg-ui-tag-purple-icon px-2 py-1 h-8 text-ui-fg-on-inverted",children:[jsx14("p",{children:`Impersonated as ${impersionatedAs}`}),jsx14("button",{onClick:removeImpersonate,className:"border border-ui-tag-neutral-border px-2",children:"Remove Impersonation"})]}));}children.push(jsx14(Shell,{children:jsx14(MainSidebar,{})}));return jsx14("div",{children});};|' node_modules/@medusajs/dashboard/dist/app.mjs

# # Clean vite cache
rm -rf node_modules/@medusajs/admin-bundler/node_modules/.vite 