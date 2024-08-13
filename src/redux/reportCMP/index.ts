import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, reportItems } from "./constants";
import { Response, CreatingRowOnServer } from "../../pages/CMP/types";

interface CustomError {
  data: { error: string };
  status: number;
}

export const getReportCMP = createApi({
  reducerPath: "getReportCMP",
  tagTypes: ["ReportCMP"],
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    {}
  >,
  endpoints: (build) => ({
    getReportCMP: build.query<Response[], void>({
      query: () => reportItems.CMP.GET_ROWS,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ReportCMP" as const, id })),
              { type: "ReportCMP", id: "LIST" },
            ]
          : [{ type: "ReportCMP", id: "LIST" }],
    }),

    addNewRowAtReport: build.mutation<CreatingRowOnServer, Partial<CreatingRowOnServer>>({
      query: (body) => ({
        url: reportItems.CMP.ADD_ROW,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ReportCMP", id: "LIST" }],
    }),

    updateRowAtReport: build.mutation<Response, Partial<Response> & Pick<Response, "id">>({
      query: ({ id, ...body }) => ({
        url: `${reportItems.CMP.UPDATE_ROW}/${id}/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ReportCMP", id: "LIST" }],
    }),

    deleteRowAtReport: build.mutation({
      query: (id) => ({
        url: `${reportItems.CMP.DELETE_ROW}/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ReportCMP", id: "LIST" }],
    }),
  }),
});

export const {
  useGetReportCMPQuery,
  useAddNewRowAtReportMutation,
  useUpdateRowAtReportMutation,
  useDeleteRowAtReportMutation,
} = getReportCMP;
