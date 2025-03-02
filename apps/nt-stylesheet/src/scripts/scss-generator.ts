// import fs from "fs";
// import * as path from "path";
//
// const generate = (entries: Record<string, any>, destination: string) => {
//     const scssContent = Object.entries(entries)
//         .map(([key, values]) => {
//             if (typeof values === "object") {
//                 return Object.entries(values)
//                     .map(([subKey, value]) => `$nt-${key}-${subKey}: ${value};`)
//                     .join("\n");
//             }
//             return `$nt-${key}: ${values};`;
//         })
//         .join("\n");
//
//     fs.writeFileSync(path.resolve(destination), scssContent);
//
//     console.log("✅ SCSS theme variables generated successfully!");
// }
//
//
// export default generate;
