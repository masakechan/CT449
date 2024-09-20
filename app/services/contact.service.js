const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }

    // Method to find a contact by ID
    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    // Extract contact data from the payload, removing undefined fields
    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    // Phương pháp tạo hoặc cập nhật một liên hệ
    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    // Phương pháp tìm liên hệ dựa trên bộ lọc
    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    // Phương pháp tìm liên hệ theo tên
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    // Method to update a contact by ID
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value; // return the updated contact
    }

    //Delete
    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    //findFavorite
    async findFavorite() {
        return await this.find({ favorite: true});
    }

    //DeleteAll
    async deleteAll() {
        const result = await this.Contact.deleteMany({});
    }
}

module.exports = ContactService;

