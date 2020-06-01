/**
 * @description Type of the object returned by any VueHttp request CRUD method.
 * @property body The body of the response, usually includes the data to be used in the application.
 * @property headers HTTP Headers of the response.
 * @property ok Determines whether the request was successful.
 * @property status HTTP Status Code of the request, determines whether the request was successful and contains some extra information about the request.
 * */
type VueHttpResponse = {body: object, headers: Headers, ok: boolean, status: number};

/** @description Wrapper of the Fetch API to simplify the working with the API. */
export default class VueHttp
{
    /**
     * @description Middleware of any request CRUD method.
     * @param method CRUD method of the request.
     * @param url URL address of the request.
     * @param data Data to be sent to the server during the request.
     * @returns Response from the server.
     * */
    private static async _request(method: 'DELETE' | 'GET' | 'POST' | 'PATCH', url: string, data: {[s: string]: any}): Promise<VueHttpResponse>
    {
        return fetch(
            url,
            // @ts-ignore
            {
                method,
                ...(method !== `GET` && {body: data})
            }
        ).then(async (res) =>
        {
            const {headers, ok, status} = res;

            if (status >= 400)
            {
                return Promise.reject({body: headers.get(`content-type`) === `application/json` ? await res.json() : null, headers, ok, status});
            }

            return Promise.resolve({body: status === 204 ? null : await res.json(), headers, ok, status});
        });
    }

    /**
     * @description Used to delete some data on the server.
     * @param url URL address of the request.
     * @param data Determines which data will be deleted, usually something which differentiates it from other entries in the DB.
     * @returns Response from the server.
     * */
    public static async delete(url: string, data: {[s: string]: string}): Promise<VueHttpResponse>
    {
        return this._request(`DELETE`, url, data);
    }

    /**
     * @description Used to get some data from the server.
     * @param url URL address of the request.
     * @param data Determines which data will be fetched, usually something which do the entries have in common.
     * @returns Response from the server.
     * */
    public static async get(url: string, data: {[s: string]: string}): Promise<VueHttpResponse>
    {
        const params: string = (() =>
        {
            const paramsObj = Object.entries(data || {}).reduce((a, [paramKey, paramValue]) =>
            {
                if (typeof paramValue === `object` && paramValue !== null)
                {
                    Object.entries(paramValue).forEach(([paramValueKey, paramValueValue]) =>
                    {
                        a[`${paramKey}[${paramValueKey}]`] = paramValueValue;
                    });

                    return a;
                }

                a[paramKey] = paramValue;
                return a;
            }, {});

            return new URLSearchParams(paramsObj).toString();
        })();

        return this._request(`GET`, `${url}${params ? `?${params}` : ``}`, data);
    }

    /**
     * @description Used to update some data on the server.
     * @param url URL address of the request.
     * @param data Data to replace the entry or parts of it.
     * @returns Response from the server.
     * */
    public static async patch(url: string, data: {[s: string]: string}): Promise<VueHttpResponse>
    {
        return this._request(`PATCH`, url, data);
    }

    /**
     * @description Used to send some data to the server.
     * @param url URL address of the request.
     * @param data The data to be sent.
     * @returns Response from the server.
     * */
    public static async post(url, data): Promise<VueHttpResponse>
    {
        return this._request(`POST`, url, data);
    }
}
