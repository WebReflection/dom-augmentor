type Context <T> = { value: T; provide: (value: T) => void; };

type RefList = ReadonlyArray<any>;

type EffectCallback = () => (void | (() => void | undefined));

type SetStateAction <S> = S | ((prevState: S) => S);
type Dispatch <A> = (value: A) => void;
type Reducer <S, A> = (prevState: S, action: A) => S;
type ReducerState <R extends Reducer<any, any>> =
  R extends Reducer <infer S, any> ? S : never;
type ReducerAction <R extends Reducer<any, any>> =
  R extends Reducer <any, infer A> ? A : never;

type RefObject <T> = { current: T | null; };
type MutableRefObject <T> = { current: T; };

declare module "dom-augmentor" {

  function augmentor <T extends (...args: any[]) => any> (input: T): T;

  function useContext <T> (context: Context<T>): T;

  function createContext <T> (initialValue: T): Context<T>;

  function useMemo <T> (callback: () => T, refs: ReadonlyArray<any>): T;

  function useCallback <T extends (...args: any[]) => any> (callback: T, refs: RefList): T;

  function useEffect (effect: EffectCallback, refs?: RefList): void;

  function useLayoutEffect (effect: EffectCallback, refs?: RefList): void;

  function useReducer<R extends Reducer<any, any>, I>(
    reducer: R, initializerArg: I & ReducerState<R>, initializer: (arg: I & ReducerState<R>) => ReducerState<R>,
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

  function useReducer<R extends Reducer<any, any>, I>(
    reducer: R, initializerArg: I, initializer: (arg: I) => ReducerState<R>,
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

  function useReducer<R extends Reducer<any, any>>(
    reducer: R, initialState: ReducerState<R>, initializer?: undefined,
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>];

  function useRef <T> (initialValue: T): MutableRefObject<T>;
  function useRef <T> (initialValue: T | null): RefObject<T>;
  function useRef <T = undefined> (): MutableRefObject<T | undefined>;

  function useState <S> (initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  function useState <S = undefined> (): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

}

