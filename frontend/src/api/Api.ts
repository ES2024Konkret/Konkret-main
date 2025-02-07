/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ActivityPublic */
export interface ActivityPublic {
  /** Activity */
  activity: string;
}

/** ActivitySchema */
export interface ActivitySchema {
  /** Report Id */
  report_id: string;
  /** Activity */
  activity: string;
}

/** Body_login_user_login_post */
export interface BodyLoginUserLoginPost {
  /** Username */
  username: string;
  /** Password */
  password: string;
}

/** EmployeePublic */
export interface EmployeePublic {
  /** Name */
  name: string | null;
  /** Id */
  id: string;
  /** Role */
  role: string | null;
  /**
   * Contract Start
   * @format date-time
   */
  contract_start: string;
  /**
   * Contract End
   * @format date-time
   */
  contract_end: string;
}

/** EmployeeSchema */
export interface EmployeeSchema {
  /** Name */
  name: string | null;
  /** Rg */
  rg: string | null;
  /** Cpf */
  cpf: string | null;
  /** Role */
  role: string | null;
  /**
   * Contract Start
   * @format date-time
   */
  contract_start: string;
  /**
   * Contract End
   * @format date-time
   */
  contract_end: string;
}

/** EquipmentPublic */
export interface EquipmentPublic {
  /** Id */
  id: string;
  /** Brand */
  brand: string | null;
  /** Type */
  type: string;
  /** Description */
  description: string | null;
  /** Quantity */
  quantity: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** EquipmentSchema */
export interface EquipmentSchema {
  /** Brand */
  brand: string | null;
  /** Type */
  type: string;
  /** Description */
  description: string | null;
  /** Quantity */
  quantity: number;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** JobSchema */
export interface JobSchema {
  /** Id */
  id: string;
  /** Work Id */
  work_id?: string | null;
  /** Employee Id */
  employee_id?: string | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** JobSchemaPublic */
export interface JobSchemaPublic {
  /** Work Id */
  work_id?: string | null;
  /** Employee Id */
  employee_id?: string | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** MaterialPublic */
export interface MaterialPublic {
  /** Id */
  id: string;
  /** Type */
  type: string | null;
  /** Cust */
  cust: number | null;
  /** Quantity */
  quantity: number | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** MaterialSchema */
export interface MaterialSchema {
  /** Type */
  type: string;
  /** Cust */
  cust: number;
  /** Quantity */
  quantity: number;
}

/** MaterialUpdateSchema */
export interface MaterialUpdateSchema {
  /** Type */
  type: string | null;
  /** Cust */
  cust: number | null;
  /** Quantity */
  quantity: number | null;
}

/** ObservationPublic */
export interface ObservationPublic {
  /** Observation */
  observation: string;
}

/** ObservationSchema */
export interface ObservationSchema {
  /** Report Id */
  report_id: string;
  /** Observation */
  observation: string;
}

/** PhotoPublic */
export interface PhotoPublic {
  /** Photo */
  photo: string;
}

/** PhotoSchema */
export interface PhotoSchema {
  /** Report Id */
  report_id: string;
  /** Photo */
  photo: string;
}

/** ProprietaryPublic */
export interface ProprietaryPublic {
  /** Name */
  name: string;
  /** Id */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** ProprietarySchema */
export interface ProprietarySchema {
  /** Name */
  name: string;
  /** Cpf */
  cpf: string;
}

/** RentEquipmentSchema */
export interface RentEquipmentSchema {
  /** Work Id */
  work_id: string;
  /** Equipment Id */
  equipment_id: string;
  /** Comments */
  comments: string;
  /** Start Time */
  start_time: string | null;
  /**
   * End Time
   * @format date-time
   */
  end_time: string;
}

/** RentEquipmentSchemaPublic */
export interface RentEquipmentSchemaPublic {
  /** Id */
  id: string;
  /** Work Id */
  work_id: string;
  /** Equipment Id */
  equipment_id: string;
  /** Comments */
  comments: string;
  /** Start Time */
  start_time: string | null;
  /**
   * End Time
   * @format date-time
   */
  end_time: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** RentEquipmentUpdateSchema */
export interface RentEquipmentUpdateSchema {
  /** Work Id */
  work_id: string | null;
  /** Equipment Id */
  equipment_id: string | null;
  /** Comments */
  comments: string;
  /** Start Time */
  start_time: string | null;
  /**
   * End Time
   * @format date-time
   */
  end_time: string;
}

/** ReportPublic */
export interface ReportPublic {
  /** Id */
  id: string;
  /** Work Id */
  work_id: string;
  /**
   * Photos
   * @default []
   */
  photos?: string[] | null;
  /** Observations */
  observations?: string | null;
  /**
   * Activities
   * @default []
   */
  activities?: string[] | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** ReportSchema */
export interface ReportSchema {
  /** Work Id */
  work_id: string;
  /**
   * Photos
   * @default []
   */
  photos?: string[] | null;
  /** Observations */
  observations?: string | null;
  /**
   * Activities
   * @default []
   */
  activities?: string[] | null;
}

/** UserPublic */
export interface UserPublic {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Cpf */
  cpf: string | null;
  /** Cnpj */
  cnpj: string | null;
  /** Email */
  email: string;
  /** Phone */
  phone: string;
}

/** UserSchema */
export interface UserSchema {
  /** Name */
  name: string;
  /** Email */
  email: string;
  /** Phone */
  phone: string;
  /** Password */
  password: string;
  user_type: UserType;
  /** Cpf */
  cpf: string | null;
  /** Cnpj */
  cnpj: string | null;
}

/** UserType */
export enum UserType {
  PF = "PF",
  PJ = "PJ",
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** WorkPublic */
export interface WorkPublic {
  /** Id */
  id: string;
  /** Name */
  name: string;
  /** Zip Code */
  zip_code: string;
  /** State */
  state: string;
  /** Neighborhood */
  neighborhood?: string | null;
  /** Public Place */
  public_place: string;
  /** Number Addres */
  number_addres?: number | null;
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
  /** User Id */
  user_id: string;
  /** Rentequipment */
  rentequipment?: RentEquipmentSchemaPublic[] | null;
  /** Jobs */
  jobs?: JobSchemaPublic[] | null;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** WorkSchema */
export interface WorkSchema {
  /** Name */
  name: string;
  /** Zip Code */
  zip_code: string;
  /** State */
  state: string;
  /** Neighborhood */
  neighborhood?: string | null;
  /** Public Place */
  public_place: string;
  /** Number Addres */
  number_addres?: number | null;
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags user
     * @name GetallUsersUserGet
     * @summary Getall Users
     * @request GET:/user
     * @secure
     */
    getallUsersUserGet: (params: RequestParams = {}) =>
      this.request<UserPublic[], any>({
        path: `/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name AddUserUserPost
     * @summary Add User
     * @request POST:/user
     */
    addUserUserPost: (data: UserSchema, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UpdateUserUserIdUpdatePut
     * @summary Update User
     * @request PUT:/user/{id}/update
     * @secure
     */
    updateUserUserIdUpdatePut: (id: string, data: UserSchema, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user/${id}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserUserIdGet
     * @summary Get User
     * @request GET:/user/{id}
     * @secure
     */
    getUserUserIdGet: (id: string, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name DeleteUserUserIdDelete
     * @summary Delete User
     * @request DELETE:/user/{id}
     * @secure
     */
    deleteUserUserIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name LoginUserLoginPost
     * @summary Login
     * @request POST:/user/login
     */
    loginUserLoginPost: (data: BodyLoginUserLoginPost, params: RequestParams = {}) =>
      this.request<object, HTTPValidationError>({
        path: `/user/login`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),
  };
  employee = {
    /**
     * No description
     *
     * @tags employee
     * @name GetallEmployeesEmployeeGet
     * @summary Getall Employees
     * @request GET:/employee
     * @secure
     */
    getallEmployeesEmployeeGet: (params: RequestParams = {}) =>
      this.request<EmployeePublic[], any>({
        path: `/employee`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags employee
     * @name AddEmployeeEmployeePost
     * @summary Add Employee
     * @request POST:/employee
     * @secure
     */
    addEmployeeEmployeePost: (data: EmployeeSchema, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags employee
     * @name UpdateEmployeeEmployeeIdUpdatePut
     * @summary Update Employee
     * @request PUT:/employee/{id}/update
     * @secure
     */
    updateEmployeeEmployeeIdUpdatePut: (id: string, data: EmployeeSchema, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee/${id}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags employee
     * @name GetEmployeeEmployeeIdGet
     * @summary Get Employee
     * @request GET:/employee/{id}
     * @secure
     */
    getEmployeeEmployeeIdGet: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags employee
     * @name DeleteEmployeeEmployeeIdDelete
     * @summary Delete Employee
     * @request DELETE:/employee/{id}
     * @secure
     */
    deleteEmployeeEmployeeIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  report = {
    /**
     * No description
     *
     * @tags report
     * @name GetallReportsReportGet
     * @summary Getall Reports
     * @request GET:/report
     * @secure
     */
    getallReportsReportGet: (params: RequestParams = {}) =>
      this.request<ReportPublic[], any>({
        path: `/report`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name AddReportReportPost
     * @summary Add Report
     * @request POST:/report
     * @secure
     */
    addReportReportPost: (data: ReportSchema, params: RequestParams = {}) =>
      this.request<ReportPublic, HTTPValidationError>({
        path: `/report`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name DeleteReportReportIdDelete
     * @summary Delete Report
     * @request DELETE:/report/{id}
     * @secure
     */
    deleteReportReportIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<ReportPublic, HTTPValidationError>({
        path: `/report/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name GetReportReportIdGet
     * @summary Get Report
     * @request GET:/report/{id}
     * @secure
     */
    getReportReportIdGet: (id: string, params: RequestParams = {}) =>
      this.request<ReportPublic, HTTPValidationError>({
        path: `/report/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name AddPhotoReportIdAddphotoPut
     * @summary Add Photo
     * @request PUT:/report/{id}/addphoto
     * @secure
     */
    addPhotoReportIdAddphotoPut: (id: string, data: PhotoSchema, params: RequestParams = {}) =>
      this.request<PhotoPublic, HTTPValidationError>({
        path: `/report/${id}/addphoto`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name RemovePhotoReportIdRemovephotoPut
     * @summary Remove Photo
     * @request PUT:/report/{id}/removephoto
     * @secure
     */
    removePhotoReportIdRemovephotoPut: (id: string, data: PhotoSchema, params: RequestParams = {}) =>
      this.request<PhotoPublic, HTTPValidationError>({
        path: `/report/${id}/removephoto`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name AddObservationReportIdAddobservationPut
     * @summary Add Observation
     * @request PUT:/report/{id}/addobservation
     * @secure
     */
    addObservationReportIdAddobservationPut: (id: string, data: ObservationSchema, params: RequestParams = {}) =>
      this.request<ObservationPublic, HTTPValidationError>({
        path: `/report/${id}/addobservation`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name RemoveObservationReportIdRemoveobservationPut
     * @summary Remove Observation
     * @request PUT:/report/{id}/removeobservation
     * @secure
     */
    removeObservationReportIdRemoveobservationPut: (id: string, data: ObservationSchema, params: RequestParams = {}) =>
      this.request<ObservationPublic, HTTPValidationError>({
        path: `/report/${id}/removeobservation`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name AddActivityReportIdAddactivityPut
     * @summary Add Activity
     * @request PUT:/report/{id}/addactivity
     * @secure
     */
    addActivityReportIdAddactivityPut: (id: string, data: ActivitySchema, params: RequestParams = {}) =>
      this.request<ActivityPublic, HTTPValidationError>({
        path: `/report/${id}/addactivity`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name RemoveActivityReportIdRemoveactivityPut
     * @summary Remove Activity
     * @request PUT:/report/{id}/removeactivity
     * @secure
     */
    removeActivityReportIdRemoveactivityPut: (id: string, data: ActivitySchema, params: RequestParams = {}) =>
      this.request<ActivityPublic, HTTPValidationError>({
        path: `/report/${id}/removeactivity`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name GetClimateReportIdClimateGet
     * @summary Get Climate
     * @request GET:/report/{id}/climate
     * @secure
     */
    getClimateReportIdClimateGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/climate`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name GetallCsvReportCsvGet
     * @summary Getall Csv
     * @request GET:/report/csv/
     * @secure
     */
    getallCsvReportCsvGet: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/report/csv/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name GetCsvReportIdCsvGet
     * @summary Get Csv
     * @request GET:/report/{id}/csv
     * @secure
     */
    getCsvReportIdCsvGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/csv`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name GetPdfReportIdPdfGet
     * @summary Get Pdf
     * @request GET:/report/{id}/pdf
     * @secure
     */
    getPdfReportIdPdfGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/pdf`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags report
     * @name GetMaterialsReportIdMaterialsGet
     * @summary Get Materials
     * @request GET:/report/{id}/materials
     */
    getMaterialsReportIdMaterialsGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/materials`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  proprietary = {
    /**
     * No description
     *
     * @tags Proprietary
     * @name GetallProprietariesProprietaryGet
     * @summary Getall Proprietaries
     * @request GET:/proprietary
     * @secure
     */
    getallProprietariesProprietaryGet: (params: RequestParams = {}) =>
      this.request<ProprietaryPublic[], any>({
        path: `/proprietary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proprietary
     * @name AddProprietaryProprietaryPost
     * @summary Add Proprietary
     * @request POST:/proprietary
     * @secure
     */
    addProprietaryProprietaryPost: (data: ProprietarySchema, params: RequestParams = {}) =>
      this.request<ProprietaryPublic, HTTPValidationError>({
        path: `/proprietary`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proprietary
     * @name GetProprietaryProprietaryIdGet
     * @summary Get Proprietary
     * @request GET:/proprietary/{id}
     * @secure
     */
    getProprietaryProprietaryIdGet: (id: string, params: RequestParams = {}) =>
      this.request<ProprietaryPublic, HTTPValidationError>({
        path: `/proprietary/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proprietary
     * @name DeleteProprietaryProprietaryIdDelete
     * @summary Delete Proprietary
     * @request DELETE:/proprietary/{id}
     * @secure
     */
    deleteProprietaryProprietaryIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<ProprietaryPublic, HTTPValidationError>({
        path: `/proprietary/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Proprietary
     * @name GetWorksProprietaryIdWorksGet
     * @summary Get Works
     * @request GET:/proprietary/{id}/works
     * @secure
     */
    getWorksProprietaryIdWorksGet: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic[], HTTPValidationError>({
        path: `/proprietary/${id}/works`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  work = {
    /**
     * No description
     *
     * @tags work
     * @name GetallWorksWorkGet
     * @summary Getall Works
     * @request GET:/work
     * @secure
     */
    getallWorksWorkGet: (params: RequestParams = {}) =>
      this.request<WorkPublic[], any>({
        path: `/work`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name AddWorkWorkPost
     * @summary Add Work
     * @request POST:/work
     * @secure
     */
    addWorkWorkPost: (data: WorkSchema, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name GetWorkWorkIdGet
     * @summary Get Work
     * @request GET:/work/{id}
     * @secure
     */
    getWorkWorkIdGet: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name DeleteWorkWorkIdDelete
     * @summary Delete Work
     * @request DELETE:/work/{id}
     * @secure
     */
    deleteWorkWorkIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name AddReportWorkIdAddreportPut
     * @summary Add Report
     * @request PUT:/work/{id}/addreport
     * @secure
     */
    addReportWorkIdAddreportPut: (
      id: string,
      query: {
        /** Report Id */
        report_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}/addreport`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name RemoveReportWorkIdRemovereportPut
     * @summary Remove Report
     * @request PUT:/work/{id}/removereport
     * @secure
     */
    removeReportWorkIdRemovereportPut: (
      id: string,
      query: {
        /** Report Id */
        report_id: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}/removereport`,
        method: "PUT",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name GetProprietaryWorkIdProprietaryGet
     * @summary Get Proprietary
     * @request GET:/work/{id}/proprietary
     * @secure
     */
    getProprietaryWorkIdProprietaryGet: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}/proprietary`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name GetReportsWorkIdReportsGet
     * @summary Get Reports
     * @request GET:/work/{id}/reports
     * @secure
     */
    getReportsWorkIdReportsGet: (id: string, params: RequestParams = {}) =>
      this.request<ReportPublic[], HTTPValidationError>({
        path: `/work/${id}/reports`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name GetWorkersWorkIdWorkersGet
     * @summary Get Workers
     * @request GET:/work/{id}/workers
     * @secure
     */
    getWorkersWorkIdWorkersGet: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic[], HTTPValidationError>({
        path: `/work/${id}/workers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name GetEquipmentsWorkIdEquipmentsGet
     * @summary Get Equipments
     * @request GET:/work/{id}/equipments
     */
    getEquipmentsWorkIdEquipmentsGet: (id: string, params: RequestParams = {}) =>
      this.request<EquipmentPublic[], HTTPValidationError>({
        path: `/work/${id}/equipments`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags work
     * @name GetEmployeesWorkIdEmployeesGet
     * @summary Get Employees
     * @request GET:/work/{id}/employees
     */
    getEmployeesWorkIdEmployeesGet: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic[], HTTPValidationError>({
        path: `/work/${id}/employees`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  equipment = {
    /**
     * No description
     *
     * @tags equipment
     * @name GetallEquipmentsEquipmentGet
     * @summary Getall Equipments
     * @request GET:/equipment
     */
    getallEquipmentsEquipmentGet: (params: RequestParams = {}) =>
      this.request<EquipmentPublic[], any>({
        path: `/equipment`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name AddEquipmentEquipmentPost
     * @summary Add Equipment
     * @request POST:/equipment
     */
    addEquipmentEquipmentPost: (data: EquipmentSchema, params: RequestParams = {}) =>
      this.request<EquipmentPublic, HTTPValidationError>({
        path: `/equipment`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name DeleteEquipmentEquipmentIdDelete
     * @summary Delete Equipment
     * @request DELETE:/equipment/{id}
     */
    deleteEquipmentEquipmentIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<EquipmentPublic, HTTPValidationError>({
        path: `/equipment/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name UpdateEquipmentEquipmentIdPut
     * @summary Update Equipment
     * @request PUT:/equipment/{id}
     */
    updateEquipmentEquipmentIdPut: (id: string, data: EquipmentSchema, params: RequestParams = {}) =>
      this.request<EquipmentPublic, HTTPValidationError>({
        path: `/equipment/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags equipment
     * @name GetEquipmentEquipmentIdGet
     * @summary Getequipment
     * @request GET:/equipment/{id}
     */
    getEquipmentEquipmentIdGet: (id: string, params: RequestParams = {}) =>
      this.request<EquipmentPublic, HTTPValidationError>({
        path: `/equipment/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  rentequipment = {
    /**
     * No description
     *
     * @tags rentequipment
     * @name GetallRentEquipmentsRentequipmentGet
     * @summary Getall Rent Equipments
     * @request GET:/rentequipment
     */
    getallRentEquipmentsRentequipmentGet: (params: RequestParams = {}) =>
      this.request<RentEquipmentSchemaPublic[], any>({
        path: `/rentequipment`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rentequipment
     * @name CreateRentEquipmentRentequipmentPost
     * @summary Create Rent Equipment
     * @request POST:/rentequipment
     */
    createRentEquipmentRentequipmentPost: (data: RentEquipmentSchema, params: RequestParams = {}) =>
      this.request<RentEquipmentSchemaPublic, HTTPValidationError>({
        path: `/rentequipment`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags rentequipment
     * @name UpdateRentequipmentRentequipmentIdUpdatePut
     * @summary Update Rentequipment
     * @request PUT:/rentequipment/{id}/update
     */
    updateRentequipmentRentequipmentIdUpdatePut: (
      id: string,
      data: RentEquipmentUpdateSchema,
      params: RequestParams = {},
    ) =>
      this.request<RentEquipmentSchemaPublic, HTTPValidationError>({
        path: `/rentequipment/${id}/update`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  jobs = {
    /**
     * No description
     *
     * @tags job
     * @name GetallJobsJobsGet
     * @summary Getall Jobs
     * @request GET:/jobs
     * @secure
     */
    getallJobsJobsGet: (params: RequestParams = {}) =>
      this.request<JobSchema[], any>({
        path: `/jobs`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags job
     * @name AddJobJobsPost
     * @summary Add Job
     * @request POST:/jobs
     * @secure
     */
    addJobJobsPost: (data: JobSchemaPublic, params: RequestParams = {}) =>
      this.request<JobSchemaPublic, HTTPValidationError>({
        path: `/jobs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags job
     * @name GetJobJobsIdGet
     * @summary Get Job
     * @request GET:/jobs/{id}
     * @secure
     */
    getJobJobsIdGet: (id: string, params: RequestParams = {}) =>
      this.request<JobSchema, HTTPValidationError>({
        path: `/jobs/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags job
     * @name DeleteJobJobsIdDelete
     * @summary Delete Job
     * @request DELETE:/jobs/{id}
     * @secure
     */
    deleteJobJobsIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<JobSchemaPublic, HTTPValidationError>({
        path: `/jobs/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  material = {
    /**
     * No description
     *
     * @tags material
     * @name GetallMaterialsMaterialGet
     * @summary Getall Materials
     * @request GET:/material
     */
    getallMaterialsMaterialGet: (params: RequestParams = {}) =>
      this.request<MaterialPublic[], any>({
        path: `/material`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags material
     * @name AddMaterialMaterialPost
     * @summary Add Material
     * @request POST:/material
     */
    addMaterialMaterialPost: (data: MaterialSchema, params: RequestParams = {}) =>
      this.request<MaterialPublic, HTTPValidationError>({
        path: `/material`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags material
     * @name DeleteMaterialMaterialIdDelete
     * @summary Delete Material
     * @request DELETE:/material/{id}
     */
    deleteMaterialMaterialIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<MaterialPublic, HTTPValidationError>({
        path: `/material/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags material
     * @name UpdateMaterialMaterialIdPut
     * @summary Update Material
     * @request PUT:/material/{id}
     */
    updateMaterialMaterialIdPut: (id: string, data: MaterialUpdateSchema, params: RequestParams = {}) =>
      this.request<MaterialUpdateSchema, HTTPValidationError>({
        path: `/material/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags material
     * @name GetMaterialMaterialIdGet
     * @summary Getmaterial
     * @request GET:/material/{id}
     */
    getMaterialMaterialIdGet: (id: string, params: RequestParams = {}) =>
      this.request<MaterialPublic, HTTPValidationError>({
        path: `/material/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
