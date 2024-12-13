import { Time } from "@angular/common"

export class BookingDTO {
    bookingId!: string
    idCard: number
    name: string
    email: string
    resource: string
    fromDate: string
    fromDateFromTime!: number
    toDate: string
    toDateToTime!: number
    allDay!: boolean
    state: string
    acceptTerms: boolean


    constructor (
      idCard: number,
      name: string,
      email: string,
      resource: string,
      fromDate: string,
      toDate: string,
      state: string,
      acceptTerms: boolean
    ) {
      this.idCard = idCard,
      this.name = name,
      this.email = email,
      this.resource = resource,
      this.fromDate = fromDate,
      this.toDate = toDate,
      this.state = state,
      this.acceptTerms = acceptTerms
    }
}


// To parse this data:
//
//   import { Convert, BookingAdrBalearsDTO } from "./file";
//
//   const bookingAdrBalearsDTO = Convert.toBookingAdrBalearsDTO(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface BookingAdrBalearsDTO {
  boo_id:           number;
  bki_id:           number;
  pro_id:           number;
  boo_title:        string;
  boo_locator:      string;
  boo_company:      BooCompany;
  boo_comments:     null;
  boo_usucre:       string;
  boo_feccre:       Date;
  bki_name:         string;
  bki_type:         string;
  bki_desc:         string;
  bkd_type:         string;
  boo_start:        Date;
  boo_end:          Date;
  bkd_comments:     null;
  booking_status:   number;
  last_date_status: Date;
}

export interface BooCompany {
  cif:     string;
  name:    string;
  email:   string;
  contact: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toBookingAdrBalearsDTO(json: string): BookingAdrBalearsDTO {
      return cast(JSON.parse(json), r("BookingAdrBalearsDTO"));
  }

  public static bookingAdrBalearsDTOToJson(value: BookingAdrBalearsDTO): string {
      return JSON.stringify(uncast(value, r("BookingAdrBalearsDTO")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
      if (typ.length === 2 && typ[0] === undefined) {
          return `an optional ${prettyTypeName(typ[1])}`;
      } else {
          return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
      }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
      return typ.literal;
  } else {
      return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
      typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
      const map: any = {};
      typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
      typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
      if (typeof typ === typeof val) return val;
      return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
      // val must validate against one typ in typs
      const l = typs.length;
      for (let i = 0; i < l; i++) {
          const typ = typs[i];
          try {
              return transform(val, typ, getProps);
          } catch (_) {}
      }
      return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
      if (cases.indexOf(val) !== -1) return val;
      return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
  }

  function transformArray(typ: any, val: any): any {
      // val must be an array with no invalid elements
      if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
      return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
      if (val === null) {
          return null;
      }
      const d = new Date(val);
      if (isNaN(d.valueOf())) {
          return invalidValue(l("Date"), val, key, parent);
      }
      return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
      if (val === null || typeof val !== "object" || Array.isArray(val)) {
          return invalidValue(l(ref || "object"), val, key, parent);
      }
      const result: any = {};
      Object.getOwnPropertyNames(props).forEach(key => {
          const prop = props[key];
          const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
          result[prop.key] = transform(v, prop.typ, getProps, key, ref);
      });
      Object.getOwnPropertyNames(val).forEach(key => {
          if (!Object.prototype.hasOwnProperty.call(props, key)) {
              result[key] = transform(val[key], additional, getProps, key, ref);
          }
      });
      return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
      if (val === null) return val;
      return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
      ref = typ.ref;
      typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
      return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
          : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
          : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "BookingAdrBalearsDTO": o([
      { json: "boo_id", js: "boo_id", typ: 0 },
      { json: "bki_id", js: "bki_id", typ: 0 },
      { json: "pro_id", js: "pro_id", typ: 0 },
      { json: "boo_title", js: "boo_title", typ: "" },
      { json: "boo_locator", js: "boo_locator", typ: "" },
      { json: "boo_company", js: "boo_company", typ: r("BooCompany") },
      { json: "boo_comments", js: "boo_comments", typ: null },
      { json: "boo_usucre", js: "boo_usucre", typ: "" },
      { json: "boo_feccre", js: "boo_feccre", typ: Date },
      { json: "bki_name", js: "bki_name", typ: "" },
      { json: "bki_type", js: "bki_type", typ: "" },
      { json: "bki_desc", js: "bki_desc", typ: "" },
      { json: "bkd_type", js: "bkd_type", typ: "" },
      { json: "bkd_start", js: "bkd_start", typ: Date },
      { json: "bkd_end", js: "bkd_end", typ: Date },
      { json: "bkd_comments", js: "bkd_comments", typ: null },
      { json: "booking_status", js: "booking_status", typ: 0 },
      { json: "last_date_status", js: "last_date_status", typ: Date },
  ], false),
  "BooCompany": o([
      { json: "cif", js: "cif", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "email", js: "email", typ: "" },
      { json: "contact", js: "contact", typ: "" },
  ], false),
};
