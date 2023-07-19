from models import db, User, Owner, Property, Review
from app import app

with app.app_context():

    def print_seed_finished_message():
        seed_finished_message = "Seed finished \U0001F331 \U0001F332\U0001F332\U0001F332 \u25AB \U0001F7E3\U0001F7E3\U0001F7E3\U0001F7E3"
        print(seed_finished_message)

    User.query.delete()
    Owner.query.delete()
    Property.query.delete()
    Review.query.delete()

    user1 = User(name='mike jones', budget=600, username='angel', password='infinite', email='real@real.com')
    user2 = User(name='ybn namhir', budget=400, username='everlasting', password='peace', email='fake@fake.com')
    # Add more users
    user3 = User(name='Max Fischer', budget=800, username='maxf', password='mypass', email='max@fake.com')
    user4 = User(name='Monsieur Gustave', budget=1200, username='gustave', password='grandbudapest', email='gustave@fake.com')
    user5 = User(name='Noriko', budget=500, username='norikoo', password='hiroshima', email='noriko@fake.com')
    user6 = User(name='Anne Laurent', budget=700, username='annel', password='hiddenpast', email='anne@fake.com')
    user7 = User(name='Zbynek Brynych', budget=1000, username='zbynekb', password='darkpast', email='zbynek@fake.com')
    user8 = User(name='Jep Gambardella', budget=900, username='jepg', password='thebeauty', email='jep@fake.com')
    user9 = User(name='Rene', budget=600, username='renel', password='amour', email='rene@fake.com')
    user10 = User(name='Georges', budget=800, username='georgesa', password='hiddenpain', email='georges@fake.com')
    user11 = User(name='Ann', budget=700, username='anna', password='undecided', email='ann@fake.com')
    user12 = User(name='Shukichi Hirayama', budget=900, username='shukichih', password='tokyo', email='shukichi@fake.com')
    user13 = User(name='Erika Kohut', budget=500, username='erikak', password='pianist', email='erika@fake.com')
    user14 = User(name='Ryu', budget=700, username='ryuk', password='waves', email='ryu@fake.com')
    user15 = User(name='Hans Haneke', budget=1000, username='hansh', password='director', email='hans@fake.com')

    owner1 = Owner(name='owner guy')
    owner2 = Owner(name='owner guy2')
    # Add more owners
    owner3 = Owner(name='Sitting Bull')
    owner4 = Owner(name='Pocahontas')
    owner5 = Owner(name='Crazy Horse')
    owner6 = Owner(name='Squanto')
    owner7 = Owner(name='Geronimo')

    p1 = Property(address='988 eastern parkway', neighborhood='crown heights', borough='brooklyn', number_of_bedrooms=2, price=1600)
    p2 = Property(address='11 broadway', neighborhood='financial district', borough='manhattan', number_of_bedrooms=10, price=10000)
    p3 = Property(address='190 Beach 69th St', neighborhood='arvene', borough='queens', number_of_bedrooms=3, price=3000)
    p4 = Property(address='2445 third avenue', neighborhood='bronx', borough='bronx', number_of_bedrooms=3, price=2000)
    p5 = Property(address='1135 pelham pkwy', neighborhood='pelham bay', borough='bronx', number_of_bedrooms=3, price=3000)
    p6 = Property(address='168 Avenue B', neighborhood='east village', borough='manhattan', number_of_bedrooms=2, price=4100)
    p7 = Property(address='233 9th ave', neighborhood='chelsea', borough='manhattan', number_of_bedrooms=1, price=3500)
    p8 = Property(address='140 Frost St', neighborhood='williamsburg', borough='brooklyn', number_of_bedrooms=2, price=4350)

    owner1.properties.append(p1)
    owner1.properties.append(p3)
    owner1.properties.append(p5)
    owner1.properties.append(p7)
    owner2.properties.append(p2)
    owner2.properties.append(p4)
    owner2.properties.append(p6)
    owner2.properties.append(p8)

    r1 = Review(owner=owner1, user=user1, rating=4, title='Great property', description='I loved this property. It was clean and spacious.')
    r2 = Review(owner=owner1, user=user2, rating=3, title='Decent place', description='The property was okay, but it could use some improvements.')
    r3 = Review(owner=owner2, user=user1, rating=5, title='Amazing experience', description='I had an amazing experience renting this property.')
    r4 = Review(owner=owner2, user=user2, rating=2, title='Disappointing', description='The property was not as described, and the owner was unresponsive.')
    # Add more reviews
    r5 = Review(owner=owner3, user=user3, rating=4, title='Beautiful property', description='The property had stunning views and great amenities.')
    r6 = Review(owner=owner3, user=user4, rating=5, title='Highly recommended', description='I had a fantastic stay at this property. The owner was very accommodating.')
    r7 = Review(owner=owner4, user=user5, rating=3, title='Average property', description='The property was decent, but nothing extraordinary.')
    r8 = Review(owner=owner4, user=user6, rating=4, title='Good value for money', description='I found the property to be affordable and comfortable.')
    r9 = Review(owner=owner5, user=user7, rating=2, title='Not satisfied', description='I had several issues with the property, and the owner was unresponsive.')
    r10 = Review(owner=owner5, user=user8, rating=5, title='Exceptional property', description='One of the best properties I have ever stayed in.')
    r11 = Review(owner=owner6, user=user9, rating=4, title='Great location', description='The property was located in a convenient area, close to shops and restaurants.')
    r12 = Review(owner=owner6, user=user10, rating=3, title='Average experience', description='The property met my basic needs, but nothing more.')
    r13 = Review(owner=owner7, user=user11, rating=5, title='Wonderful property', description='I had a memorable stay at this property. Highly recommended.')
    r14 = Review(owner=owner7, user=user12, rating=2, title='Not as described', description='The property did not match the description provided.')
    r15 = Review(owner=owner7, user=user13, rating=4, title='Cozy and comfortable', description='The property had a warm and inviting atmosphere.')

    db.session.add_all([
        user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15,
        owner1, owner2, owner3, owner4, owner5, owner6, owner7,
        p1, p2, p3, p4, p5, p6, p7, p8,
        r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15
    ])
    db.session.commit()

    print_seed_finished_message()