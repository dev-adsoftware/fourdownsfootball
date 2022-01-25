class EmojiDecoder {
  public static decode(input: string): any {
    const u = (codeUnit: any) => {
      return '\\u' + codeUnit.toString(16).toUpperCase();
    };

    const toUTF16 = (codePoint: any) => {
      const TEN_BITS = parseInt('1111111111', 2);

      if (codePoint <= 0xffff) {
        return u(codePoint);
      }
      codePoint -= 0x10000;

      // Shift right to get to most significant 10 bits
      const leadSurrogate = 0xd800 + (codePoint >> 10);

      // Mask to get least significant 10 bits
      const tailSurrogate = 0xdc00 + (codePoint & TEN_BITS);

      return u(leadSurrogate) + u(tailSurrogate);
    };

    const unicode = input
      .split('')
      .map((code: string) => {
        return toUTF16(String(code.charCodeAt(0) + 127397));
      })
      .join('');

    return JSON.parse(`["${unicode}"]`)[0];
    // return unicode;
  }
}

export {EmojiDecoder};
