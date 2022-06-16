import * as dateFns from "date-fns";
import IMask from "imask";

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

export const dateMask = masker({
  masked: {
    mask: Date,
    pattern: dateFormatClient,
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
        to: 9999
      }
    },
    format: (date: any) => {
      return dateFns.format(date, dateFormatClient);
    },
    parse: (dateStr: string) => {
      return dateFns.parse(dateStr, dateFormatClient, new Date());
    }
  },
  transform: (value: any) => {
    if (!value) {
      return value;
    }
    const date = dateFns.parse(value, dateFormatClient, new Date());
    return dateFns.format(date, dateFormatApi);
  },
  maskDefault: (value: string) => {
    return dateFns.format(
      dateFns.parse(value, dateFormatApi, new Date()),
      dateFormatClient
    );
  }
});