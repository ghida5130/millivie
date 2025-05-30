export async function safeFetch(name, url, options) {
    let result = {
        data: null,
        errorCode: null,
    };

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            result.errorCode = res.status;
            throw new Error(`[${res.status}] ${name} request failed`);
        }
        const json = await res.json();
        result.data = json;
    } catch (error) {
        let errorMessage;

        if (error instanceof Error) errorMessage = error.message;
        else if (typeof error === "string") errorMessage = error;
        else errorMessage = `${name} fetch unknown error`;

        console.error(errorMessage);

        if (!result.errorCode) result.errorCode = 500;
    }

    return result;
}
