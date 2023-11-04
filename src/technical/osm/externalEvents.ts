export interface ExternalEventMap {
  id: string;
  name: string;
  description: string;
  position: [number, number];
}

interface IGeoJSON {
  properties: {
    name: string;
    urls: {
      datalayer_view: string;
    }
    datalayers: Array<{
      id: string;
      name: string;
    }>
}
}

interface ILayerData {
  features: Array<{
    properties: {
      name: string;
      description: string;
    }
    geometry: {
      type: 'Point';
      coordinates: [number, number]
    }
  }>
}

const OSM_URL = 'http://umap.openstreetmap.fr';

export async function fetchExternalEvents() {
  const events: ExternalEventMap[] = [];

  const geoJSONResponse = await fetch(`${OSM_URL}/en/map/936980/geojson/`);
  const geoJSON = (await geoJSONResponse.json()) as IGeoJSON;

  const data = await Promise.all(geoJSON.properties.datalayers.map(async layer => {
    try {
      const dataLayerResponse = await fetch(`${OSM_URL}${geoJSON.properties.urls.datalayer_view.replace('{pk}', layer.id)}`);
      const dataLayer = (await dataLayerResponse.json()) as ILayerData;
      return dataLayer.features.filter(({ geometry }) => geometry.type ==='Point').map((point, index) => ({
        id: `${layer.id}_${index}`,
        name: point.properties.name,
        description: point.properties.description,
        position: point.geometry.coordinates,
      }));
    } catch (e) {
      console.warn(`Could not fetch layer ${layer.id}`);
    }
    return [];
  }))

  for(const dataLayer of data ) {
    events.push(...dataLayer);
  }

  return events;
}
