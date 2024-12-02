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

/** EmployeePublic */
export interface EmployeePublic {
  /** Name */
  name: string | null;
  /** Id */
  id: string;
  /** Role */
  role: string | null;
  /** Salary */
  salary: number | null;
  /** Work Id */
  work_id?: string | null;
}

/** EmployeeSchema */
export interface EmployeeSchema {
  /** Name */
  name: string | null;
  /** Rg */
  rg: number;
  /** Cpf */
  cpf: number;
  /** Role */
  role: string | null;
  /** Salary */
  salary: number;
  /** Work Id */
  work_id?: string | null;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** LoginSchema */
export interface LoginSchema {
  /** Email */
  email: string;
  /** Password */
  password: string;
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

/** ReportPublic */
export interface ReportPublic {
  /** Id */
  id: string;
  /** Work Id */
  work_id: string;
  /** Photos */
  photos: any[] | null;
  /** Observations */
  observations: any[] | null;
  /** Activities */
  activities: any[] | null;
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
  /** Photos */
  photos: any[] | null;
  /** Observations */
  observations: any[] | null;
  /** Activities */
  activities: any[] | null;
}

/** UserPublic */
export interface UserPublic {
  /** Name */
  name: string;
  /** Cpf */
  cpf: string | null;
  /** Cnpj */
  cnpj: string | null;
  /** Email */
  email: string;
}

/** UserSchema */
export interface UserSchema {
  /** Name */
  name: string;
  /** Email */
  email: string;
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
  /** Address */
  address: string;
  /** Proprietary Id */
  proprietary_id: string;
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
  /** Proprietary Id */
  proprietary_id: string;
  /** Address */
  address: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
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
     */
    getallUsersUserGet: (params: RequestParams = {}) =>
      this.request<UserPublic[], any>({
        path: `/user`,
        method: "GET",
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
     */
    updateUserUserIdUpdatePut: (id: string, data: UserSchema, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user/${id}/update`,
        method: "PUT",
        body: data,
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
     */
    getUserUserIdGet: (id: string, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user/${id}`,
        method: "GET",
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
     */
    deleteUserUserIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<UserPublic, HTTPValidationError>({
        path: `/user/${id}`,
        method: "DELETE",
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
    loginUserLoginPost: (data: LoginSchema, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/user/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
     */
    getallEmployeesEmployeeGet: (params: RequestParams = {}) =>
      this.request<EmployeePublic[], any>({
        path: `/employee`,
        method: "GET",
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
     */
    addEmployeeEmployeePost: (data: EmployeeSchema, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee`,
        method: "POST",
        body: data,
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
     */
    updateEmployeeEmployeeIdUpdatePut: (id: string, data: EmployeeSchema, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee/${id}/update`,
        method: "PUT",
        body: data,
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
     */
    getEmployeeEmployeeIdGet: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee/${id}`,
        method: "GET",
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
     */
    deleteEmployeeEmployeeIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic, HTTPValidationError>({
        path: `/employee/${id}`,
        method: "DELETE",
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
     */
    getallReportsReportGet: (params: RequestParams = {}) =>
      this.request<ReportPublic[], any>({
        path: `/report`,
        method: "GET",
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
     */
    addReportReportPost: (data: ReportSchema, params: RequestParams = {}) =>
      this.request<ReportPublic, HTTPValidationError>({
        path: `/report`,
        method: "POST",
        body: data,
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
     */
    deleteReportReportIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<ReportPublic, HTTPValidationError>({
        path: `/report/${id}`,
        method: "DELETE",
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
     */
    getReportReportIdGet: (id: string, params: RequestParams = {}) =>
      this.request<ReportPublic, HTTPValidationError>({
        path: `/report/${id}`,
        method: "GET",
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
     */
    addPhotoReportIdAddphotoPut: (id: string, data: PhotoSchema, params: RequestParams = {}) =>
      this.request<PhotoPublic, HTTPValidationError>({
        path: `/report/${id}/addphoto`,
        method: "PUT",
        body: data,
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
     */
    removePhotoReportIdRemovephotoPut: (id: string, data: PhotoSchema, params: RequestParams = {}) =>
      this.request<PhotoPublic, HTTPValidationError>({
        path: `/report/${id}/removephoto`,
        method: "PUT",
        body: data,
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
     */
    addObservationReportIdAddobservationPut: (id: string, data: ObservationSchema, params: RequestParams = {}) =>
      this.request<ObservationPublic, HTTPValidationError>({
        path: `/report/${id}/addobservation`,
        method: "PUT",
        body: data,
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
     */
    removeObservationReportIdRemoveobservationPut: (id: string, data: ObservationSchema, params: RequestParams = {}) =>
      this.request<ObservationPublic, HTTPValidationError>({
        path: `/report/${id}/removeobservation`,
        method: "PUT",
        body: data,
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
     */
    addActivityReportIdAddactivityPut: (id: string, data: ActivitySchema, params: RequestParams = {}) =>
      this.request<ActivityPublic, HTTPValidationError>({
        path: `/report/${id}/addactivity`,
        method: "PUT",
        body: data,
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
     */
    removeActivityReportIdRemoveactivityPut: (id: string, data: ActivitySchema, params: RequestParams = {}) =>
      this.request<ActivityPublic, HTTPValidationError>({
        path: `/report/${id}/removeactivity`,
        method: "PUT",
        body: data,
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
     */
    getClimateReportIdClimateGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/climate`,
        method: "GET",
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
     */
    getallCsvReportCsvGet: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/report/csv/`,
        method: "GET",
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
     */
    getCsvReportIdCsvGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/csv`,
        method: "GET",
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
     */
    getPdfReportIdPdfGet: (id: string, params: RequestParams = {}) =>
      this.request<any, HTTPValidationError>({
        path: `/report/${id}/pdf`,
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
     */
    getallProprietariesProprietaryGet: (params: RequestParams = {}) =>
      this.request<ProprietaryPublic[], any>({
        path: `/proprietary`,
        method: "GET",
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
     */
    addProprietaryProprietaryPost: (data: ProprietarySchema, params: RequestParams = {}) =>
      this.request<ProprietaryPublic, HTTPValidationError>({
        path: `/proprietary`,
        method: "POST",
        body: data,
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
     */
    getProprietaryProprietaryIdGet: (id: string, params: RequestParams = {}) =>
      this.request<ProprietaryPublic, HTTPValidationError>({
        path: `/proprietary/${id}`,
        method: "GET",
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
     */
    deleteProprietaryProprietaryIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<ProprietaryPublic, HTTPValidationError>({
        path: `/proprietary/${id}`,
        method: "DELETE",
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
     */
    getWorksProprietaryIdWorksGet: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic[], HTTPValidationError>({
        path: `/proprietary/${id}/works`,
        method: "GET",
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
     */
    getallWorksWorkGet: (params: RequestParams = {}) =>
      this.request<WorkPublic[], any>({
        path: `/work`,
        method: "GET",
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
     */
    addWorkWorkPost: (data: WorkSchema, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work`,
        method: "POST",
        body: data,
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
     */
    getWorkWorkIdGet: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}`,
        method: "GET",
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
     */
    deleteWorkWorkIdDelete: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}`,
        method: "DELETE",
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
     */
    getProprietaryWorkIdProprietaryGet: (id: string, params: RequestParams = {}) =>
      this.request<WorkPublic, HTTPValidationError>({
        path: `/work/${id}/proprietary`,
        method: "GET",
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
     */
    getReportsWorkIdReportsGet: (id: string, params: RequestParams = {}) =>
      this.request<ReportPublic[], HTTPValidationError>({
        path: `/work/${id}/reports`,
        method: "GET",
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
     */
    getWorkersWorkIdWorkersGet: (id: string, params: RequestParams = {}) =>
      this.request<EmployeePublic[], HTTPValidationError>({
        path: `/work/${id}/workers`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
