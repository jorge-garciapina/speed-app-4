export type KeyboardEventObject = {
  character: string;
  isCorrect: boolean;
};
/////////////////////////////////////////////
// USED IN THE Context:

//************* */
export type AllowedCharactersType =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type IndividualCharacterInfoType = {
  totalSuccess: number;
  totalErrors: number;
  accuracy: number;
  averageSpeed: number;
};
export type AvailableCharactersType = {
  // For each character
  [key in AllowedCharactersType]: IndividualCharacterInfoType;
};
export type InputStatisticsType = {
  // For the whole game
  inputInThisSession: CharacterComponentPropsType[] | [];
  totalSuccess: number; // Number of correct characters in this session
  totalErrors: number; // Number of incorrect characters in this session
  accuracy: number;
  maxSpeed: number;
  averageSpeed: number;
  availableCharacters: AvailableCharactersType;
};

export type StatisticsPlayerInfo = {
  email: string;
  playersStatistics: string;
};
export type AuthPlayerInfo = {
  email: string;
  hashedPassword: string;
};
export type PlayerInfo = {
  name: string;
  email: string;
  avatar: string;
};

//************* */
export type ReducerStateType = {
  // Game related types
  currentWord: string;
  currentWordLength: number;
  currentIndexInWord: number;
  lastStroke: number;
  winnerModal: boolean;
  showWinnerModal: boolean;
  timeInterval: number;
  difficulty: number;
  inputCharacters: KeyboardEventObject[];
  gameMode: string;
  isBackSpaceAllowed: boolean;
  isWaiting: boolean;
  wordsNumber: number;
  typedWords: number;

  // Login related types
  userID: string;
  validatedUserEmail: string;
  validatedUserAvatar: string;
  validatedUserName: string;

  // Statistics related types
  InputStatistics: InputStatisticsType;

  // Register
  userName: string;
  avatar: string;
  userPassword: string;
  userEmail: string;
};

export type ValidGameModes = "option1" | "option2";

// This will "grow" as I add new actions.
export type ValidActionTypes =
  | "change-current-word"
  | "notify-new-key"
  | "reset-current-index-in-word"
  | "update-statistics"
  | "update-time-of-last-stroke"
  | "start-game"
  | "finish-game"
  | "decrease-interval-time"
  | "call-winner-modal"
  | "close-winner-modal"
  | "restart-values"
  | "set-userName"
  | "set-userPassword"
  | "set-userEmail"
  | "set-user-ID"
  | "set-avatar"
  | "notify-user-offline"
  | "notify-user-online"
  | "update-input-characters"
  | "reset-input-characters"
  | "update-game-mode"
  | "update-allow-backspace"
  | "notify-key-deleted"
  | "update-user-name"
  | "update-avatar";

export type ActionType = {
  type: ValidActionTypes;
  keyboardEvent?: string;
  newWord?: string;
  newStatisticsObject?: InputStatisticsType;
  lastStrokeTimeStamp?: number;
  totalTime?: number;
  difficulty?: number;
  newTimeInterval?: number;
  newInfo?: string;
  newAvatar?: string;
  validatedUserEmail?: string;
  validatedUserAvatar?: string;
  validatedUserName?: string;
  newInputCharacter?: KeyboardEventObject;
  newGameMode?: ValidGameModes;
  isBackSpaceAllowedValue?: boolean;
  newWordsNumber?: number;
  newUserName?: string;
};

/////////////////////////////////////////////
// FOR CUSTOM COMPONENT:
type LevelDataType = string[] | [];

type LevelTypes = {
  level1: LevelDataType;
  level2: LevelDataType;
  level3: LevelDataType;
  level4: LevelDataType;
  level5: LevelDataType;
  level6: LevelDataType;
  level7: LevelDataType;
};

export type WordsDataType = {
  [key in keyof LevelTypes]: LevelTypes[key] | [];
};
/////////////////////////////////////////////

// FOR CHARACTER COMPONENT:
export type CharacterComponentPropsType = {
  isCorrect: boolean;
  character: string;
};

/////////////////////////////////////////////
//FOR THE MODAL:
export type InfoForModal = {
  character: AllowedCharactersType;
  infoObject: IndividualCharacterInfoType;
};

/////////////////////////////////////////////
//FOR THE LOGIN:
export type RegisterCredentialsType = {
  userName: string | undefined;
  userEmail: string | undefined;
  userAvatar: string | undefined;
  password: string | undefined;
};

export type LoginCredentialsType = {
  userID: string | undefined;
  password: string | undefined;
};

export type LoginInfoType = {
  name: string;
  email: string;
  avatar: string;
};
export type ValidatorFunctionType = (paramToValidate: string) => boolean;
export type FormItemPropsType = {
  textToDisplay: string;
  label: string;
  isLoginItem: boolean;
  validationFunction: ValidatorFunctionType;
  dispatchFunction: (newInfo: string) => void;

  // onChangeHandler: () => void;
};

export type FormItemsToRender = {
  items: FormItemPropsType[];
};
//////////////////////////
// FOR THE STATISTICS VISUALIZER:
export type StatisticsVisualizerPropsType = {
  statistics?: string;
};
