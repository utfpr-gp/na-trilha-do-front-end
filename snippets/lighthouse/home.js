    featuredList.replaceChildren(
      ...featured.map((trail) => createTrailCard(trail, isFavorite(trail.id))),
    );
    prioritizeFirstImage(featuredList); // [!code highlight]
