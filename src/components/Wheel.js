import React from 'react';
import Card from './Card.js';

class Wheel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            radius: 150,
            cards: [],
            theta: 0.0,
            snap_point: { x: null, y: null },
            snap_in_progress: false,
            children_loaded: 0,
            loaded: false,
            isAutoRotating: false,
            activeCardData: null, // To hold the content of the expanded card
        };

        this.temp_theta = 0.0;
        this.anim_id = null;
        this.wheelRef = React.createRef();
        this.autoRotateTimeoutId = null;
        this.travelCards = [];
    }

    componentDidMount = async () => {
        const wheelElement = this.wheelRef.current;
        if (!wheelElement) return;

        const center_of_wheel = {
            x: wheelElement.offsetWidth / 2,
            y: wheelElement.offsetHeight / 2,
        };

        this.travelCards = [
            { title: "Paris, France", description: "The city of lights, known for the Eiffel Tower, world-class museums, and charming cafés.", image: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D" },
            { title: "Kyoto, Japan", description: "Ancient temples, cherry blossoms, and traditional tea houses make Kyoto a serene escape.", image: "https://plus.unsplash.com/premium_photo-1722593856044-e5176ca19a5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a3lvdG98ZW58MHx8MHx8fDA%3D" },
            { title: "Machu Picchu, Peru", description: "A mystical Incan citadel nestled high in the Andes — a hiker’s dream.", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjaHUlMjBwaWNjaHV8ZW58MHx8MHx8fDA%3D" },
            { title: "Santorini, Greece", description: "Famous for its whitewashed houses and blue domes overlooking the Aegean Sea.", image: "https://images.unsplash.com/photo-1678266561093-324802646fb2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pfGVufDB8fDB8fHww" },
            { title: "New York, USA", description: "The city that never sleeps — home to Central Park, Broadway, and towering skyscrapers.", image: "https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D" },
            { title: "Cape Town, South Africa", description: "A stunning blend of mountains, beaches, and vibrant culture at the tip of Africa.", image: "https://plus.unsplash.com/premium_photo-1697730061063-ad499e343f26?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FwZSUyMHRvd258ZW58MHx8MHx8fDA%3D" },
            { title: "Reykjavik, Iceland", description : "Northern lights, geothermal lagoons, and glaciers await in this unique destination.",image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJleWtqYXZpa3xlbnwwfHwwfHx8MA%3D%3D" },
            { title: "Petra, Jordan", description: "An ancient rose-red city carved into desert cliffs, with millennia of history.", image: "https://images.unsplash.com/photo-1705628078563-966777473473?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0cmF8ZW58MHx8MHx8fDA%3D" },
        ];

        const temp_cards = this.travelCards.map((item, i) => (
            <Card
                key={i}
                index={i} // Pass index to identify the card
                radius={this.state.radius}
                theta={(Math.PI * 2 / this.travelCards.length) * i}
                center={center_of_wheel}
                pic={item.image}
                title={item.title}
                amLoaded={this.children_loaded}
            />
        ));

        this.setState({ cards: temp_cards });
    }

    startAutoRotate = (direction) => {
        if (this.state.isAutoRotating) {
            clearTimeout(this.autoRotateTimeoutId);
        }
        this.temp_theta = this.state.theta;
        this.setState({ isAutoRotating: true, activeCardData: null }); // Hide panel on start

        const step = () => {
            const step_angle = 45;
            const rotationAmount = direction === 'clockwise' ? step_angle : -step_angle;
            this.temp_theta += rotationAmount;

            const wheelElement = this.wheelRef.current;
            if (!wheelElement) return;

            wheelElement.style.transition = 'transform 1.0s ease-in-out';
            wheelElement.style.transform = `translate(-50%, -50%) rotate(${this.temp_theta}deg)`;

            // Reset all cards first
            for (let card of wheelElement.children) {
                card.style.transition = 'transform 1.0s ease-in-out, z-index 0.5s';
                card.style.transform = `translate(-50%, -50%) rotate(${-this.temp_theta}deg) scale(0.8)`;
                card.style.zIndex = 1;
            }

            setTimeout(() => {
                if (!this.state.isAutoRotating || !this.wheelRef.current) return;

                const wheelRect = this.wheelRef.current.getBoundingClientRect();
                const centerX = wheelRect.left + wheelRect.width / 2;
                const centerY = wheelRect.top + wheelRect.height / 2;
                // Snap point is on the right for autorotation
                const snapPoint = { x: centerX + this.state.radius, y: centerY };

                let shortestDistance = Infinity;
                let closestCard = null;

                for (let card of wheelElement.children) {
                    const rect = card.getBoundingClientRect();
                    const cardCenterX = rect.left + rect.width / 2;
                    const cardCenterY = rect.top + rect.height / 2;
                    const distance = Math.hypot(cardCenterX - snapPoint.x, cardCenterY - snapPoint.y);
                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        closestCard = card;
                    }
                }

                if (closestCard) {
                    closestCard.style.transition = 'transform 0.5s ease-in-out';
                    closestCard.style.transform = `translate(-50%, -50%) rotate(${-this.temp_theta}deg) scale(1.4)`;
                    closestCard.style.zIndex = 100;
                    
                    // Update the active card data to display in the panel
                    const cardIndex = parseInt(closestCard.dataset.index, 10);
                    this.setState({ activeCardData: this.travelCards[cardIndex] });
                }

                this.autoRotateTimeoutId = setTimeout(step, 3000);
            }, 1000);
        };

        step();
    }

    stopAutoRotate = () => {
        clearTimeout(this.autoRotateTimeoutId);
        this.setState({
            isAutoRotating: false,
            theta: this.temp_theta
        });
    }

    handle_scroll = event => {
        if (this.state.isAutoRotating || (this.state.snap_in_progress && !this.state.loaded)) {
            return;
        }
        this.setState({ activeCardData: null }); // Hide panel while scrolling

        clearTimeout(this.anim_id);
        let scroll_speed = (event.deltaY / 360) * 20;
        this.temp_theta += scroll_speed;

        const wheelElement = this.wheelRef.current;
        wheelElement.style.transition = 'none';
        wheelElement.style.transform = `translate(-50%, -50%) rotate(${this.temp_theta}deg)`;

        for (let child of wheelElement.children) {
            child.style.transition = 'none';
            child.style.transform = `translate(-50%, -50%) rotate(${-1.0 * this.temp_theta}deg)`;
        }

        this.anim_id = setTimeout(() => {
            this.setState({ theta: this.temp_theta, snap_in_progress: true }, () => {
                this.snap_back();
            });
        }, 150);
    }
    
    snap_back = () => {
        // Define snap point on 0 degrees for manual scroll
        const wheelRect = this.wheelRef.current.getBoundingClientRect();
        const centerX = wheelRect.left + wheelRect.width / 2;
        const centerY = wheelRect.top + wheelRect.height / 2;
        const manualSnapPoint = { x: centerX + this.state.radius, y: centerY };

        let shortest_distance = Infinity;
        let closest_card = null;
        let closest_card_index = -1;

        for (let i = 0; i < this.wheelRef.current.children.length; i++) {
            const card = this.wheelRef.current.children[i];
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            const distance = Math.hypot(cardCenterX - manualSnapPoint.x, cardCenterY - manualSnapPoint.y);

            if (distance < shortest_distance) {
                shortest_distance = distance;
                closest_card = card;
                closest_card_index = i;
            }
        }
        
        const cardInitialAngle = (360 / this.travelCards.length) * closest_card_index;
        const finalRotation = this.temp_theta - (this.temp_theta % 360 - cardInitialAngle);

        this.wheelRef.current.style.transition = 'transform 1.0s';
        this.wheelRef.current.style.transform = `translate(-50%, -50%) rotate(${finalRotation}deg)`;

        for (let i = 0; i < this.wheelRef.current.children.length; i++) {
            this.wheelRef.current.children[i].style.transition = 'transform 1.0s';
            if (closest_card === this.wheelRef.current.children[i]) {
                this.wheelRef.current.children[i].style.transform = `translate(-50%, -50%) rotate(${-finalRotation}deg) scale(1.4)`;
                this.wheelRef.current.children[i].style.zIndex = 100;
            } else {
                this.wheelRef.current.children[i].style.transform = `translate(-50%, -50%) rotate(${-finalRotation}deg) scale(0.8)`;
                this.wheelRef.current.children[i].style.zIndex = 1;
            }
        }

        setTimeout(() => {
            this.setState({
                snap_in_progress: false,
                theta: finalRotation,
                activeCardData: this.travelCards[closest_card_index]
            });
            this.temp_theta = finalRotation;
        }, 1000);
    }

    render() {
        return (
            <div style={styles.container}>
                <div onWheel={this.handle_scroll} ref={this.wheelRef} style={styles.wheel}>
                    {this.state.cards}
                </div>

                {/* Info Panel is a SIBLING of the wheel, not a child */}
                {this.state.activeCardData && (
                    <div style={styles.infoPanel}>
                        <h2>{this.state.activeCardData.title}</h2>
                        <p>{this.state.activeCardData.description}</p>
                    </div>
                )}

                <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={() => this.startAutoRotate('anticlockwise')}>Anti-Clockwise</button>
                    <button style={styles.button} onClick={this.stopAutoRotate}>Stop</button>
                    <button style={styles.button} onClick={() => this.startAutoRotate('clockwise')}>Clockwise</button>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'sans-serif'
    },
    wheel: {
        margin: '0', padding: '0', height: '400px', width: '400px',
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    infoPanel: {
        position: 'absolute',
        top: '50%',
        left: 'calc(50% + 300px)',
        transform: 'translateY(-50%)',
        width: '320px',
        padding: '30px',
        background: 'linear-gradient(145deg, #f5f7fa, #c3cfe2)',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid #ddd',
        zIndex: 200,
        transition: 'opacity 0.5s, transform 0.5s',
        color: '#333',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    buttonContainer: {
        position: 'absolute', bottom: '50px', display: 'flex', gap: '10px', zIndex: 1000,
    },
    button: {
        padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: '2px solid #555',
        borderRadius: '8px', backgroundColor: '#fff', fontWeight: 'bold',
    }
};

export default Wheel;