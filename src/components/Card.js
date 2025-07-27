import React from 'react';

class Card extends React.Component {
    componentDidMount() {
        if (typeof this.props.amLoaded === 'function') {
            this.props.amLoaded();
        }
    }

    get_position() {
        const { radius, theta } = this.props;
        return {
            x: radius * Math.cos(theta),
            y: radius * Math.sin(theta)
        };
    }

    render() {
        const coord = this.get_position();
        return (
            // We pass the index here to identify the card later
            <div
                data-index={this.props.index}
                style={{
                    ...styles.card,
                    left: `${this.props.center.x + coord.x}px`,
                    top: `${this.props.center.y - coord.y}px`
                }}
            >
                <img alt={this.props.title} src={this.props.pic} style={styles.image} />
            </div>
        );
    }
}

const styles = {
    card: {
        margin: '0',
        padding: '0',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid blue',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)', // for subtle shadow
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%'
    }
};

export default React.memo(Card);

