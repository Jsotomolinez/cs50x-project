from sqlalchemy.orm import Session
from db.connection import get_db
from db.schema import User, Department, Brand, Provider, Line, Product

def populate(db):
    users(db)
    departments(db)
    brands(db)
    providers(db)
    lines(db)
    products(db)


def users(db: Session):
    if not db.query(User).first():
        db.add_all([
            User(
                username="Jesús Soto",
                email="jsotomolinez12@gmail.com",
                password="12345",
                phone_number="0412-0499985"
            ),
            User(
                username="Alaa Hourani",
                email="AlaaHourani@gmail.com",
                password="contraseña",
                phone_number="0412-5009191"
            ),
            User(
                username="Esperanza Hong",
                email="HopeCare@gmail.com",
                password="skincare",
                phone_number="0412-19944281"
            ),
            User(
                username="Ivana Mendoza",
                email="IvanaMenodoza77@gmail.com",
                password="holassss",
                phone_number="0412-8976137"
            ),
        ])
        db.commit()


def departments(db: Session):
    if not db.query(Department).first():
        db.add_all([
            Department(name="Maquillaje"),
            Department(name="Perfumes"),
            Department(name="Cara"),
            Department(name="Polvos"),
            Department(name="Boca"),
        ])
        db.commit()


def brands(db: Session):
    if not db.query(Brand).first():
        db.add_all([
            Brand(name="Loreal"),
            Brand(name="Cerave"),
            Brand(name="Eucerin"),
            Brand(name="Valmy"),
            Brand(name="LaRoche"),
        ])
        db.commit()


def providers(db: Session):
    if not db.query(Provider).first():
        db.add_all([
            Provider(
                name="empresa_1",
                phone_number="123456789",
                email="kajsndkjnsa@gmail.com"
            ),
            Provider(
                name="empresa_2",
                # phone_number="87654324567",
                email="qazwedctgb@gmail.com"
                ),
            Provider(
                name="empresa_3",
                phone_number="87218371",
                # email="ugdjahjkhj@gmial.com"
                ),
            Provider(
                name="empresa_4",
                phone_number="87654324569999999997",
                email="ugdj97kjsanahjkhj@gmial.com"
                ),
            Provider(
                name="empresa_5",
                phone_number="87324567",
                email="ugahjkhj@gmial.com"
                ),
        ])
        db.commit()


def lines(db: Session):
    if not db.query(Line).first():
        db.add_all([
            Line(name="Corrector", department_id=1),
            Line(name="Sombras", department_id=1),
            Line(name="Splashes", department_id=2),
            Line(name="Colonias", department_id=2),
            Line(name="Humectantes", department_id=3),
            Line(name="Aguas miscelares", department_id=3),
            Line(name="Labiales", department_id=5),
            Line(name="Brillo", department_id=4),
            Line(name="Rubor", department_id=4),
            Line(name="Humectantes labiales", department_id=5),
        ])
        db.commit()


def products(db: Session):
    if not db.query(Product).first():
        db.add_all([
            Product(
                name="Crema facial hidratante",
                description="L'Oreal Paris Skin Care, Revitalift Triple Power anti-edad con Pro Retinol. ",
                image="https://m.media-amazon.com/images/I/71FNxwqISJL._SL1500_.jpg",
                cost=15.3,
                price=22.80,
                department_id=3,
                brand_id=1,
                line_id=5,
                provider_id=1,
            ),
            Product(
                name="L'Oreal Paris Skincare Revitalift Derm",
                description="Suero de ácido hialurónico para la piel, suero facial de ácido hialurónico puro al 1.5%, cuidado para la piel, humecta, hidrata, rellena la piel, reduce las arrugas, suero antienvejecimiento, 1 oz ",
                image="https://m.media-amazon.com/images/I/71IoE52LztL._SL1500_.jpg",
                cost=16.2,
                price=23.21,
                department_id=3,
                brand_id=1,
                line_id=6,
                provider_id=2,
            ),
            Product(
                name="Victoria's Secret Bare Vanilla",
                description="Spray corporal para mujer, notas de vainilla batida y cachemira suave, colección Bare Vanilla (8.4 onzas) ",
                image="https://m.media-amazon.com/images/I/61WfTqDcqKL._SL1500_.jpg",
                cost=8.3,
                price=15.0,
                department_id=1,
                brand_id=3,
                line_id=3,
                provider_id=3,
            ),
            Product(
                name="Loción de fragancia Bare Vanilla",
                description="Victoria's Secret Loción de fragancia Bare Vanilla ",
                image="https://m.media-amazon.com/images/I/51mWZBK4Y8L._SL1500_.jpg",
                cost=3.2,
                price=12,
                department_id=4,
                brand_id=5,
                line_id=6,
                provider_id=7,
            ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
            # Product(
            #     name="",
            #     description="",
            #     image="",
            #     cost="",
            #     price="",
            #     department_id="",
            #     brand_id="",
            #     line_id="",
            #     provider_id="",
            # ),
        ])
        db.commit()