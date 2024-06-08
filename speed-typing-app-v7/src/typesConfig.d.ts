import "@mui/material/Paper"; // DO NOT USE import ON THE .d.ts
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    boardItem: true;
  }
}

// In this part I should declare the different variatons for the buttons
// This comes as a "substitution" for the custom components that I had originally
// planned but resulted not practical
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    startGame: true;
    playAgain: true;
    statistics: true;
  }
}

//////////////////////////////////
// TYPOGRAPHY:
declare module "@mui/material/styles" {
  interface TypographyVariants {
    typedCharacterCorrect: React.CSSProperties;
    typedCharacterIncorrect: React.CSSProperties;
    currentWord: React.CSSProperties;
    totalSuccess: React.CSSProperties;
    numericIndicator: React.CSSProperties;
    endGameModal: React.CSSProperties;
    gameInfo: React.CSSProperties;
    gameConfigHeader: React.CSSProperties;
    lateralMenuSectionHeader: React.CSSProperties;
    loginRegister: React.CSSProperties;
    loginRegisterHeader: React.CSSProperties;
    invalidUserCredentials: React.CSSProperties;
    navigationLink: React.CSSProperties;
    generalText: React.CSSProperties;
    successIndicator: React.CSSProperties;
    errorsIndicator: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    typedCharacterCorrect?: React.CSSProperties;
    typedCharacterIncorrect?: React.CSSProperties;
    currentWord?: React.CSSProperties;
    totalSuccess?: React.CSSProperties;
    numericIndicator?: React.CSSProperties;
    endGameModal?: React.CSSProperties;
    gameInfo?: React.CSSProperties;
    gameConfigHeader?: React.CSSProperties;
    lateralMenuSectionHeader?: React.CSSProperties;
    loginRegister?: React.CSSProperties;
    loginRegisterHeader?: React.CSSProperties;
    invalidUserCredentials?: React.CSSProperties;
    navigationLink?: React.CSSProperties;
    generalText?: React.CSSProperties;
    successIndicator?: React.CSSProperties;
    errorsIndicator?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    typedCharacterCorrect: true;
    typedCharacterIncorrect: true;
    currentWord: true;
    totalSuccess: true;
    numericIndicator: true;
    endGameModal: true;
    gameInfo: true;
    gameConfigHeader: true;
    lateralMenuSectionHeader: true;
    loginRegister: true;
    loginRegisterHeader: true;
    invalidUserCredentials: true;
    navigationLink: true;
    generalText: true;
    successIndicator: true;
    errorsIndicator: true;
  }
}
