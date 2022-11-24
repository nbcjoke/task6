export interface MessageModel {
  from: {
    _id: string;
    name: string;
  };
  to: {
    _id: string;
    name: string;
  };
  message: {
    text: string;
    theme: string;
  };
  time: string;
  _id: string;
}
