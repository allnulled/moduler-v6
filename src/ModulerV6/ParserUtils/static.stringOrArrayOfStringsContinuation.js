static stringOrArrayOfStringsContinuation({ state, grammar, countingFrom, text, parser, }) {
  let pos;
  Find_end_position: {
    pos = ModulerV6.prototype._findStringOrArrayEnd(text, countingFrom);
  }
  Push_token: {
    parser._pushToken({
      starter: grammar[0],
      state,
      countingFrom,
      text,
      currentPosition: pos,
      enderLength: 0,
      extraOffset: 0,
    });
  }
  Update_state: {
    state.position = pos + (">".length);
  }
}