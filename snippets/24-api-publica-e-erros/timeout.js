// Desiste depois de 8 segundos: o fetch é cancelado e lança um TimeoutError
const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
