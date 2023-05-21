import db from '../db/db.js';
import Group from "../models/Group.js";

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
        try {
            const { count, rows } = await Group.findAndCountAll({
                attributes: ['id', 'name'],
                offset,
                limit
            });
            return  { count, rows };
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
