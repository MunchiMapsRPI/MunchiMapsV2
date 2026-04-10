function MarkerLoop(machines) {
    return machines.map((machine, index) => (
        <Marker
            key={index}
            position={[machine.latitude, machine.longitude]}
            icon={machine.machineType === 'drink' ? drinkIcon :
                  machine.machineType === 'food' ? foodIcon :
                  machine.machineType === 'food&drink' ? foodAndDrinkIcon : null
            }
        >
            <Popup>
                <div>
                    <h3>{machine.machineType === 'drink' ? 'Drink Vending Machine' : machine.machineType === 'food' ? 'Food Vending Machine' : 'Food & Drink Vending Machine'}</h3>
                    <p>Location: {machine.latitude.toFixed(4)}, {machine.longitude.toFixed(4)}</p>
                </div>
            </Popup>
        </Marker>
    ));
}

export default MarkerLoop;