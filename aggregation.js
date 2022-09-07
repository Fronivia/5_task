// Что бы у обоих наших классов были одинаковые методы и их реализацию
// Создадим абстрактный класс, от которого они будут наследоваться

class Airplanes {

    // Задаём имя и максимальную скорость при создании
    constructor(name, speed, airport) {
        this.name = name;
        this.maxSpeed = speed;
        this.status = 'На земле';
        this.airport = airport;
    }


    // Методы меняют состояния где находится самолёт
    takeoff() {
        // взлетает со взлетной полосы и освобождает её
        this.airport.freeSpace(this);
        this.status = 'В воздухе';
    }

    landing() {
        // садится на посадочную полосу и занимает её
        this.airport.takePlane(this);
        this.status = 'На земле';
    }

    // Узнать, где находится самолёт: в воздухе или на земле
    getStatus() {
        console.log(this.status)
    }
}

// Класс самолёта Миг

class Mig extends Airplanes {

    // Уникальный метод для класса Миг
    attack() {
        console.log('Атака');
    }
}

// Класс самолёта Ту-154

class Ty154 extends Airplanes {

}

class Airport {

    constructor() {
        this.currentPlane = null;
        this.parking = [];
    }

    // После посадки посадочная полоса становится занята
    takePlane(plane) {
        this.currentPlane = plane;
    }

    // После взлета взлетная полоса становится свободной
    freeSpace() {
        this.currentPlane = null;
    }

    // берет самолёт с полосы и паркует его
    parkPlane() {
        this.parking.push(this.currentPlane);
        this.currentPlane = null;
    }

    // Готовит самолёт к вылету выводя с парковки
    preparePlane(plane) {

        if (this.currentPlane) throw new Error('Взлетная/посадочная полоса занята');

        const planeIndex = this.parking.findIndex(parkedPlane => plane === parkedPlane);
        console.log(planeIndex);
        if (planeIndex !== -1) {
            this.currentPlane = this.parking[planeIndex];
            this.parking.splice(planeIndex, 1);
        } else {
            throw new Error('Самолёт не был найден на парковке :(')
        }
    }

    // свой метод: эвакуация, очищает парковку
    evacuation() {
        if (this.currentPlane) this.currentPlane.takeoff();

        this.parking.forEach(plane => {
            this.currentPlane = plane;
            this.currentPlane.takeoff();
            this.currentPlane = null;
        })

        this.parking = [];
    }
    // свой метод: помыть самолёт
    washPlane(plane) {
        const dirtyPlane = this.parking.find(parkedPlane => parkedPlane === plane);

        if (dirtyPlane) {
            dirtyPlane.washed = 'washed';
        } else {
            throw new Error('Нет самолёта для мойки')
        }
    }
}

const airport = new Airport();
const mig = new Mig('Победа', 500, airport);
// Привозим миг в аэропорт
mig.landing();
console.log(airport.currentPlane);
// Паркуем
airport.parkPlane();
console.log(airport.parking);
// Готовим к вылету
airport.preparePlane(mig);
console.log(airport.currentPlane);
// Самолёт взлетает
mig.takeoff();
mig.getStatus();
// Самолёт атакует
mig.attack();
// Создаем еще одну модель
const ty154 = new Ty154('Надежда', 500, airport);
ty154.landing();
airport.parkPlane();
console.log(airport.parking);
// эвакуируем всех
airport.evacuation();
console.log(airport.parking);
