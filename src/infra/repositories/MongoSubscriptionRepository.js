"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoSubscriptionRepository = void 0;
const subscriptionModel_1 = require("../database/models/subscriptionModel");
class MongoSubscriptionRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield subscriptionModel_1.subscriptionModel.create(Object.assign(Object.assign({}, data), { createdAt: new Date() }));
            return subscription.toJSON();
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { idUser: filter.idUser };
            if (filter.description) {
                query.description = filter.description;
            }
            if (filter.startDate || filter.endDate) {
                query.createdAt = {};
                if (filter.startDate) {
                    query.createdAt.$gte = filter.startDate;
                }
                if (filter.endDate) {
                    query.createdAt.$lte = filter.endDate;
                }
            }
            const subscriptions = yield subscriptionModel_1.subscriptionModel.find(query).sort({ createdAt: -1 });
            return subscriptions.map((subscription) => subscription.toJSON());
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield subscriptionModel_1.subscriptionModel.findById(id);
            return subscription ? subscription.toJSON() : null;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield subscriptionModel_1.subscriptionModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }), {
                new: true
            });
            return subscription ? subscription.toJSON() : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield subscriptionModel_1.subscriptionModel.findByIdAndDelete(id);
        });
    }
    buildQuery(filter) {
        const query = { idUser: filter.idUser };
        if (filter.description) {
            query.description = { $regex: filter.description, $options: "i" };
        }
        if (filter.category) {
            query.category = filter.category;
        }
        if (filter.startDate || filter.endDate) {
            query.createdAt = {};
            if (filter.startDate) {
                query.createdAt.$gte = filter.startDate;
            }
            if (filter.endDate) {
                query.createdAt.$lte = filter.endDate;
            }
        }
        return query;
    }
}
exports.MongoSubscriptionRepository = MongoSubscriptionRepository;
