import { makeObservable, observable, runInAction } from "mobx";

export enum BtnSize {
  Sm = "small",
  Md = "medium",
  L = "large",
}

export interface BtnVMCtorProps {
  label: string;
  primary?: boolean;
  backgroundColor?: string;
  size?: BtnSize;
  onClick?: () => void;
}

// export abstract class ViewModelBase {
//   constructor() {}
// }

// export class BtnVM extends ViewModelBase {
export class BtnVM {
  constructor(props: BtnVMCtorProps) {
    makeObservable(this);
    // super();
    this._label = props.label ?? "Default";
    this._primary = props.primary ?? false;
    this._backgroundColor = props.backgroundColor ?? "#87c9ff";
    this._size = props.size ?? BtnSize.Md;
    this._border = false;
    console.log('ААААААВТОМОБИЛЬ!!11')
  }
  @observable
  private _label: string;
  @observable
  private _primary: boolean;
  @observable
  private _backgroundColor: string;
  @observable
  private _size: BtnSize;
  @observable
  private _border: boolean;

  public get label(): string {
    return this._label;
  }
  public set label(val: string) {
    runInAction(() => {
      this._label = val;
    });
  }

  public get border(): boolean {
    return this._border;
  }
  public set border(val: boolean) {
    runInAction(() => {
      this._border = val;
    });
  }

  public get primary(): boolean {
    return this._primary;
  }
  public set primary(val: boolean) {
    runInAction(() => {
      this._primary = val;
    });
  }

  public get backgroundColor(): string {
    return this._backgroundColor;
  }
  public set backgroundColor(val: string) {
    runInAction(() => {
      this._backgroundColor = val;
    });
  }

  public get size(): BtnSize {
    return this._size;
  }
  public set size(val: BtnSize) {
    runInAction(() => {
      this._size = val;
    });
  }

  public onClick?: () => void;
}
