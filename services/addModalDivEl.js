import portalId from 'services/portalId';

/**
 * Append the portal element to the body.
 */
export default function addModalDivEl() {
  // Bail early if div is already added.
  if (document.getElementById(portalId) !== null) {
    return;
  }

  const container = document.createElement('div');
  container.id = portalId;

  document.body.appendChild(container);
}
