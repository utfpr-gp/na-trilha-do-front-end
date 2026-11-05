const data = getTrails();       // sem o await: data é uma Promise, ainda sem os dados
data.filter((t) => t.destaque); // erro: Promise não tem filter

const data = await getTrails(); // com o await: data é o array
