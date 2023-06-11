import db from '../db/db.js';
import Group from "../models/Group.js";
import { InvalidGroupRequestError } from "../errors/index.js";
import {checkData} from "./utils.js";

class GroupService {
    async createGroup(groupData) {
        try {
            await Group.create(groupData);
        }
        catch (err) {
            throw new InvalidGroupRequestError('Failed to create group.');
        }

    }

    async getGroups(offset, limit) {
        try {
            const { count, rows } = await Group.findAndCountAll({
                attributes: ['id', 'name', 'permission'],
                offset,
                limit
            });
            return  { count, rows };
        } catch (err) {
            throw new InvalidGroupRequestError('Failed to fetch groups.');
        }
    }

    async getGroup(id) {
        try {
            const group = await Group.findByPk(id);
            checkData(group);
            return group;
        } catch (err) {
            throw new InvalidGroupRequestError('Failed to fetch group.');
        }
    }

    async updateGroup(group) {
        const { id, ...groupFields} = group;
        try {
            return await db.transaction(async () => {
                const isGroupExist = await this.getGroup(id);
                checkData(isGroupExist);
                await Group.update({...groupFields}, {
                    where: { id }
                });
                return `Group with ID ${id} is updated.`;
            })
        } catch (err) {
            throw new InvalidGroupRequestError('Failed to update group.');
        }
    }

    async deleteGroup(id) {
        try {
            return await db.transaction(async () => {
                const isGroupExist = await this.getGroup(id);
                checkData(isGroupExist);
                await Group.destroy( {
                    where: { id }
                });
                return `Group with ID ${id} is deleted.`;
            })
        } catch (err) {
            throw new InvalidGroupRequestError('Failed to delete group.');
        }
    }
}

export default new GroupService();
