class Airport {

    constructor() {
        this.currentPlane = null;
        this.parking = null;
    }

    // После посадки посадочная полоса становится занята
    takePlane(plane) {
        this.currentPlane = plane;
    }

    // После взлета взлетная полоса становится свободной
    freeSpace(plane) {
        this.currentPlane = plane;
    }

    // берет самолёт с полосы и паркует его
    parkPlane() {
        if (this.currentPlane) {
            this.parking = this.currentPlane;
            this.currentPlane = null;
        } else {
            throw new Error('Самолёт не на площадке')
        }
    }

    // Готовит самолёт к вылету выводя с парковки
    preparePlane() {
        if (!this.parking) throw new Error('Самолёт не был найден на парковке :(')
        this.currentPlane = this.parking;
        this.parking = null;
    }

    // свой метод
    // Если самолёт в аэропорту, то его можно проапгрейдить
    upgrade() {
        if (this.parking) {
            this.parking.maxSpeed *= 3;
        } else {
            throw new Error('Пригоните самолёт в ангар')
        }
    }

    // свой метод: помыть самолёт
    washPlane(plane) {
        if (this.parking) {
            this.parking.washed = true;
        } else {
            throw new Error('Пригоните самолёт в ангар')
        }
    }
}


class Airplanes {

    // Задаём имя и максимальную скорость при создании
    constructor(name, speed) {
        this.name = name;
        this.maxSpeed = speed;
        this.status = 'На земле';
        this.airport = new Airport();
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


const mig = new Mig('Победа', 500);
// Привозим миг в аэропорт
mig.landing();
console.log(mig.airport.currentPlane);
// Паркуем
mig.airport.parkPlane();
console.log(mig.airport.parking);
// Готовим к вылету
mig.airport.preparePlane(mig);
console.log(mig.airport.currentPlane);
// Самолёт взлетает
mig.takeoff();
mig.getStatus();
// Самолёт атакует
mig.attack();
// Создаем еще одну модель
const ty154 = new Ty154('Надежда', 500);
ty154.landing();
ty154.airport.parkPlane();
console.log(ty154.airport.parking);
// эвакуируем всех
ty154.airport.upgrade();
console.log(ty154.maxSpeed);
