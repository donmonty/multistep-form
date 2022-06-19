import * as dateFns from "date-fns";
import IMask from "imask";
import moment from "moment";

/**
 * https://stackoverflow.com/a/10452789/8786986
 * @param args
 */
const masker = ({
  masked,
  transform,
  maskDefault
}: {
  masked: any;
  transform?: any;
  maskDefault?: any;
}) =>
  (function () {
    const mask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.UNMASKED,
      IMask.PIPE_TYPE.MASKED
    );

    const unmask = IMask.createPipe(
      masked,
      IMask.PIPE_TYPE.MASKED,
      IMask.PIPE_TYPE.UNMASKED
    );

    const onChange = (e: any) => {
      const unmasked = unmask(e.target.value);
      const newValue = mask(unmasked);
      e.target.value = newValue;
    };

    return {
      mask,
      onChange,
      transform: transform || unmask,
      unmask,
      maskDefault: maskDefault || mask
    };
  })();

const dateFormatClient = "dd/MM/yyyy";
const dateFormatApi = "yyyy-MM-dd";
const expirationDateFormat = "MM/YYYY";

export const dateMask = masker({
  masked: {
    mask: Date,
    pattern: dateFormatClient,
    // lazy: false,
    blocks: {
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 9999,
        maxLength: 4
      }
    },
    format: (date: any) => {
      // return moment(date).format(dateFormatClient);
      return dateFns.format(date, dateFormatClient);
    },
    parse: (dateStr: string) => {
      // return moment(dateStr, dateFormatClient);
      return dateFns.parse(dateStr, dateFormatClient, new Date());
    }
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }
    // const date = moment(value, dateFormatClient);
    // return moment(date).format(dateFormatClient);

    const date = dateFns.parse(value, dateFormatClient, new Date());
    console.log(date);
    return dateFns.format(date, dateFormatApi);
  },
  maskDefault: (value: string) => {
    // const date = moment(value, dateFormatClient);
    // return moment(date).format(dateFormatClient);

    return dateFns.format(
      // dateFns.parse(value, dateFormatApi, new Date()),
      dateFns.parse(value, dateFormatApi, new Date()),
      dateFormatClient
    );
  }
});

export const monthYearMask = masker({
  masked: {
    mask: [
      {
        mask: "00/00",
        format: "monthYear"
      },
      {
        mask: "00/00",
        format: "monthYear2"
      }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const monthYearMask = dynamicMasked.compiledMasks.find(
        ({ format }: any) => format === "monthYear"
      );
      const monthYearMask2 = dynamicMasked.compiledMasks.find(
        ({ format }: any) => format === "monthYear2"
      );
      return monthYearMask;
    }
  }
});

export const dateOfBirthMask = masker({
  masked: {
    mask: [
      { mask: "00/00/0000", format: "dateOfBirth" }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const dateOfBirthMask = dynamicMasked.compiledMasks.find(
        ({ format }: any) => format === "dateOfBirth"
      );
      return dateOfBirthMask;
    }
  }
});

export const cardNumberMask = masker({
  masked: {
    mask: [
      { mask: "0000 0000 0000 0000", format: "creditCardNumber" }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const cardNumberMask = dynamicMasked.compiledMasks.find(
        ({ format }: any) => format === "creditCardNumber"
      );
      return cardNumberMask;
    }
  }
});

export const cvcMask = masker({
  masked: {
    mask: [
      { mask: "000", format: "cvc" }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const cvcMask = dynamicMasked.compiledMasks.find(
        ({ format }: any) => format === "cvc"
      );
      return cvcMask;
    }
  }
});

export const phoneMask = masker({
  masked: {
    mask: [
      { mask: "(000)-000-0000", format: "phoneNumber" }
    ],
    dispatch: (appended: any, dynamicMasked: any) => {
      const phoneMask = dynamicMasked.compiledMasks.find(
        ({ format }: any) => format === "phoneNumber"
      );
      return phoneMask;
    }
  }
});

export const expirationDateMask = masker({
  masked: {
    mask: Date,
    pattern: expirationDateFormat,
    lazy: false,
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 2022,
        to: 9999
      }
    },
    format: (date: any) => {
      return moment(date).format(expirationDateFormat);
      // return dateFns.format(date, expirationDateFormat);
    },
    parse: (dateStr: string) => {
      return moment(dateStr, expirationDateFormat);
      // return dateFns.parse(dateStr, expirationDateFormat, new Date());
    }
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }
    // return value;
    // const date = dateFns.parse(value, expirationDateFormat, new Date());
    // return dateFns.format(date, expirationDateFormat);
    const date = dateFns.parse(value, expirationDateFormat, new Date());
    console.log(date);
    return dateFns.format(date, dateFormatApi);
  },
  maskDefault: (value: string) => {
    // return dateFns.format(
    //   dateFns.parse(value, expirationDateFormat, new Date()),
    //   expirationDateFormat
    // );
    // return value;
    return dateFns.format(
      // dateFns.parse(value, dateFormatApi, new Date()),
      dateFns.parse(value, dateFormatApi, new Date()),
      expirationDateFormat
    );
  }
});
