export type StatePair<T> = [T, StateDispatcher<T>];
export type StateDispatcher<T> = React.Dispatch<React.SetStateAction<T>>;
