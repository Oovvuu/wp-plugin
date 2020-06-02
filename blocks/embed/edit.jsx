import React from 'react';
import PropTypes from 'prop-types';

/**
 * A React component to render an Oovvuu Embed.
 */
const EmbedEdit = (props) => {
  const {
    // blockEditor: {
    //   InspectorControls,
    // },
    components: {
      TextControl,
    },
    i18n: {
      __,
    },
  } = wp;
  const {
    attributes: {
      id = '',
    } = {},
  } = props;

  const divRef = React.useRef();

  /**
   * Add script to render embed.
   */
  React.useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = '!function(e,t,o){let n;const r=e.getElementsByTagName("script")[0];e.getElementById(o)||(n=e.createElement("script"),n.id=o,n.onload=()=>{},n.src="https://playback.prod.oovvuu.io/player/bundle.js",r.parentNode.insertBefore(n,r))}(document,0,"oovvuu-player-sdk");';
    divRef.current.appendChild(script);
  }, [id]);

  return (
    <>
      <TextControl
        label={__('Oovvuu Embed ID', 'oovvuu-app')}
        value={id}
        readOnly="readonly"
      />

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
    id: PropTypes.string,
  }),
};

export default EmbedEdit;
