export type CheckPhone = (
  rule: unknown,
  value: string,
  callback: (e?: Error | undefined) => void
) => void;

export const checkPhone: CheckPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
  if (!value) return callback(new Error('电话号码不能为空'));

  if (!Number.isInteger(+value)) {
    callback(new Error('请输入数字值'));
  } else {
    phoneReg.test(value)
      ? callback()
      : callback(new Error('电话号码格式不正确'));
  }
};

export const checkEmail: CheckPhone = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!value) return callback(new Error('邮箱不能为空'));

  mailReg.test(value)
    ? callback()
    : callback(new Error('请输入正确的邮箱格式'));
};
