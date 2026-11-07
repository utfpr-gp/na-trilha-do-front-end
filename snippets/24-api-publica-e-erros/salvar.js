    const trail = readTrail();
    // As coordenadas do centro da cidade, para a previsão do tempo. Sem elas, a trilha é gravada assim mesmo.
    const coordinates = await findCityCoordinates(trail.cidade, trail.uf).catch(() => null);
    if (coordinates) Object.assign(trail, coordinates);
    const created = await createTrail(trail); // o servidor devolve a trilha com o id novo
