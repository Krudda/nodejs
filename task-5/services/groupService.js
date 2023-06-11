import db from '../db/db.js';
import Group from "../models/Group.js";
import {InvalidGroupRequestError} from "../errors.js";

class GroupService {
    async createGroup(groupData) {
        try {
            return await db.transaction(async () => {
                return await Group.create(groupData);
            })
        }
        catch (err) {
            throw new Error(err)
        }

    }

    async getGroups(offset, limit) {
        // if (true) throw new InvalidGroupRequestError('Error from getGroups service');
        try {
            if (true) throw new InvalidGroupRequestError('Error from getGroups service');
            // const { count, rows } = await Group.findAndCountAll({
            //     attributes: ['id', 'name', 'permission'],
            //     offset,
            //     limit
            // });
            // return  { count, rows };
        } catch (err) {
            throw new Error(err)
        }
    }

    async getGroup(id) {
        try {
            const group = await Group.findByPk(id);
            if (!group) {
                return new Error(`Group with ID: ${id} not found.`);
            }
            return group;
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateGroup(group) {
        const { id, ...groupFields} = group;
        try {
            return await db.transaction(async () => {
                const checkGroupError = await this.getGroup(id);

                if (checkGroupError instanceof Error) {
                    return checkGroupError;
                }

                await Group.update({...groupFields}, {
                    where: { id }
                });
                return `Group with ID ${id} is updated.`;
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteGroup(id) {
        try {
            return await db.transaction(async () => {
                const checkGroupError = await this.getGroup(id);

                if (checkGroupError instanceof Error) {
                    return checkGroupError;
                }

                await Group.destroy( {
                    where: { id }
                });
                return `Group with ID ${id} is deleted.`;
            })
        } catch (err) {
            return new Error(err.message)
        }
    }
}

export default new GroupService();
