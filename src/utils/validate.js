export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

export function validateMail(s) {
  var reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (reg.test(s)) {
    return true;
  } else {
    return false;
  }
}
export function validatePasswordJs(s) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  if (reg.test(s)) {
    return true;
  } else {
    return false;
  }
}

export function validateCodeJs(s) {
  let reg = /^[a-z0-9]{6}$/;
  if (reg.test(s)) {
    return true;
  } else {
    return false;
  }
}
