class Person {
  constructor(name, gender) {
    this.name = name
    this.gender = gender
  }

  getName() {
    return this.name
  }

  getGender() {
    return this.gender
  }

  getAge() {
    throw Error('Method not implemented')
  }
}

class FamilyMember extends Person {
  constructor(name, gender, relation, age) {
    super(name, gender)
    this.relation = relation
    this.age = age
  }

  getRelation() {
    return this.relation
  }

  getAge() {
    return this.age
  }
}

const johnDoe = new Person('John Doe', 'male')
console.log('Created a Person:', johnDoe.getName(), johnDoe.getGender())

const janeDoe = new Person()
console.log('Created Jane Doe:', janeDoe.getName(), janeDoe.getGender())

const celine = new FamilyMember('Celine', 'Female', 'Fiancee', 26)
console.log('Created a Family Member:', celine.getName(), celine.getGender(), celine.getRelation(), celine.getAge())


