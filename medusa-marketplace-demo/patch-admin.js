const fs = require("fs");

const findFilePathByNamePattern = (filePattern, fileExtension) => {
  const dirPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;

  // Read the list of files in the directory
  const files = fs.readdirSync(dirPath);

  // Find the first file that matches the pattern
  const fileName = files.find(
    (file) => file.startsWith(filePattern) && file.endsWith(fileExtension)
  );

  if (!fileName) {
    throw new Error(`No file found matching pattern: ${filePattern}`);
  }

  const filePath = `${dirPath}/${fileName}`;

  return filePath;
};

function findChunkFileByContainingText(text) {
  try {
    const dirPath = `${__dirname}/node_modules/@medusajs/dashboard/dist`;

    // Read the list of files in the directory
    const files = fs.readdirSync(dirPath);

    // Filter out files that match the pattern chunk-*.mjs
    const targetFiles = files.filter(
      (file) => file.startsWith("chunk-") && file.endsWith(".mjs")
    );

    // Loop over the matching files and check their content
    for (const fileName of targetFiles) {
      const filePath = `${dirPath}/${fileName}`;
      const content = fs.readFileSync(filePath, "utf8");

      // If the file contains the target string, print its name
      if (content.includes(text)) {
        console.log(`Found '${text}' in file: ${filePath}`);
        return filePath;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const readFileAsLines = (filePath) => {
  // Read the file content
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Split the file into lines
  const lines = fileContent.split("\n");

  return lines;
};

const writeFile = (lines, filePath) => {
  // Write the modified content back to the file
  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
  console.log(`Updated ${filePath} successfully.`);
};

const APP_MJS_PATH = `${__dirname}/node_modules/@medusajs/dashboard/dist/app.mjs`;
const VITE_CACHE_PATH = `${__dirname}/node_modules/@medusajs/admin-bundler/node_modules/.vite`;
const LOGIN_PATH = findFilePathByNamePattern("login-", ".mjs");
const REST_PASSWORD_PATH = findFilePathByNamePattern("reset-password-", ".mjs");

////////////////////////////////////////////////////////////////////////////////////////////

// 1) Welcome to Medusa -> Welcome to Marketplace
const CHUNK_1 = findChunkFileByContainingText("Welcome to Medusa");
if (CHUNK_1) {
  let lines = readFileAsLines(CHUNK_1);
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/Welcome to Medusa/g, "Welcome to Marketplace");
  }
  writeFile(lines, CHUNK_1);
}

// 2) hide avatar logo on login page
lines = readFileAsLines(LOGIN_PATH);
lines[105 - 1] = "";
writeFile(lines, LOGIN_PATH);

// 3) hide avatar logo on reset password page
lines = readFileAsLines(REST_PASSWORD_PATH);
lines[137 - 1] = "";
lines[206 - 1] = "";
lines[320 - 1] = "";
writeFile(lines, REST_PASSWORD_PATH);

// 4) hide documentation and changelog links from menu
lines = readFileAsLines(APP_MJS_PATH);
lines[2553 - 1] = "";
lines[2554 - 1] = "";
lines[2555 - 1] = "";
lines[2556 - 1] = "";
lines[2557 - 1] = "";
lines[2558 - 1] = "";
lines[2559 - 1] = "";
lines[2560 - 1] = "";
lines[2561 - 1] = "";
writeFile(lines, APP_MJS_PATH);

// 5) add Impersonate block
lines = readFileAsLines(APP_MJS_PATH);
const newCode = `var MainLayout=()=>{const impersonateKey="IMPERSIONATED_AS";const removeImpersonate=async()=>{localStorage.removeItem(impersonateKey);await fetch("/admin/impersonate-reset");window.location.href="/app"};const impersionatedAs=localStorage.getItem(impersonateKey);const children=[];if(impersionatedAs){children.push(jsx14("div",{className:"flex justify-between bg-ui-tag-purple-icon px-2 py-1 h-8 text-ui-fg-on-inverted",children:[jsx14("p",{children:\`Impersonated as \${impersionatedAs}\`}),jsx14("button",{onClick:removeImpersonate,className:"border border-ui-tag-neutral-border px-2",children:"Remove Impersonation"})]}));}children.push(jsx14(Shell,{children:jsx14(MainSidebar,{})}));return jsx14("div",{children});};`;
lines[2777 - 1] = newCode; // Line 2738 (array index 2737)
lines[2778 - 1] = ""; // Clear line 2739
lines[2779 - 1] = ""; // Clear line 2740
writeFile(lines, APP_MJS_PATH);

// Reset Vite cache
if (fs.existsSync(VITE_CACHE_PATH)) {
  fs.rmSync(VITE_CACHE_PATH, { recursive: true, force: true });
  console.log("Vite cache cleared successfully.");
} else {
  console.log("Vite cache directory not found.");
}
