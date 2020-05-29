import React from 'react';
import PropTypes from 'prop-types';

/**
 * A React component to render the edit view of a sample block.
 */
const EmbedEdit = (props) => {
  const {
    blockEditor: {
      InspectorControls,
    },
    components: {
      TextControl,
      PanelBody,
    },
    i18n: {
      __,
    },
  } = wp;
  const {
    attributes: {
      id = '6ec9b090-41a0-4782-998a-f1c59bae6ac0',
    } = {},
  } = props;

  const divRef = React.useRef();

  React.useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = '!function(e,t,o){let n;const r=e.getElementsByTagName("script")[0];e.getElementById(o)||(n=e.createElement("script"),n.id=o,n.onload=()=>{},n.src="https://playback.prod.oovvuu.io/player/bundle.js",r.parentNode.insertBefore(n,r))}(document,0,"oovvuu-player-sdk");';
    divRef.current.appendChild(script);
  }, [id]);

  return (
    <>
      <InspectorControls key="inspector">
        <PanelBody
          initialOpen
          title={__('Oovvuu Embed', 'oovvuu-app')}
        >
          <TextControl
            label={__('Embed ID', 'oovvuu-app')}
            value={id}
          />
        </PanelBody>
      </InspectorControls>

      <div ref={divRef}>
        <div data-oovvuu-embed={id} />
      </div>
    </>
  );
};

// Set up initial props.
EmbedEdit.defaultProps = {
  attributes: {
    id: '',
  },
};

// Set PropTypes for this component.
EmbedEdit.propTypes = {
  attributes: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default EmbedEdit;
