export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
});

export const defaultToast = {
  status: "error",
  message: "",
  time: 2000,
  open: false,
};
