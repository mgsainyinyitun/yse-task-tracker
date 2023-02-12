import { createTheme } from "@mui/system";
import { createContext, useMemo, useState } from "react";


export const THEME = {
    DARK:
    {
        palette:
        {
            mode: "dark",
        }
    },
    LIGHT:
    {
        palette:
        {
            mode: "light",
        }

    }
}


  
    // const theme = useMemo(
    //   () =>
    //     createTheme({
    //       palette: {
    //         mode,
    //       },
    //     }),
    //   [mode],
    // );


// const getDesignTokens = ( mode) => ({
//     palette: {
//       mode,
//       ...(mode === 'light'
//         ? {
//             // palette values for light mode
//             primary: amber,
//             divider: amber[200],
//             text: {
//               primary: grey[900],
//               secondary: grey[800],
//             },
//           }
//         : {
//             // palette values for dark mode
//             primary: deepOrange,
//             divider: deepOrange[700],
//             background: {
//               default: deepOrange[900],
//               paper: deepOrange[900],
//             },
//             text: {
//               primary: '#fff',
//               secondary: grey[500],
//             },
//           }),
//     },
//   });
  


// export const ColorModeContext = createContext({
//     toggleColorMode: () => { }
// });

// export function useMode() {
//     const [mode, setMode] = useState(THEME.LIGHT.palette.mode);
//     const colorMode = useMemo(
//         () => ({
//             toggleColorMode: () => {
//                 setMode((prevMode) => prevMode === THEME.LIGHT.palette.mode ?
//                     THEME.DARK.palette.mode : THEME.LIGHT.palette.mode
//                 );
//             }
//         }),
//         [],
//     );

//     const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//     return [theme,colorMode];
// }

