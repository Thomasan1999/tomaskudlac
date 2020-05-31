type VueHttpResponse = {body: object, headers: Headers, ok: boolean, status: number};

export default class VueHttp
{
    public static async _request(method: 'DELETE' | 'GET' | 'POST' | 'PATCH', url: string, data: {[s: string]: any}): Promise<VueHttpResponse>
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

    public static async delete(url: string, data: {[s: string]: string}): Promise<VueHttpResponse>
    {
        return this._request(`DELETE`, url, data);
    }

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

    public static async patch(url: string, data: {[s: string]: string}): Promise<VueHttpResponse>
    {
        return this._request(`PATCH`, url, data);
    }

    public static async post(url, data): Promise<VueHttpResponse>
    {
        return this._request(`POST`, url, data);
    }
}
