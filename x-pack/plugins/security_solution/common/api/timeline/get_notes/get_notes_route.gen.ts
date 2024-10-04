/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Elastic Security - Timeline - Notes API
 *   version: 2023-10-31
 */

import { z } from '@kbn/zod';

import { Note } from '../model/components.gen';

export type DocumentIds = z.infer<typeof DocumentIds>;
export const DocumentIds = z.union([z.array(z.string()), z.string()]);

export type SavedObjectIds = z.infer<typeof SavedObjectIds>;
export const SavedObjectIds = z.union([z.array(z.string()), z.string()]);

export type GetNotesResult = z.infer<typeof GetNotesResult>;
export const GetNotesResult = z.object({
  totalCount: z.number(),
  notes: z.array(Note),
});

export type GetNotesRequestQuery = z.infer<typeof GetNotesRequestQuery>;
export const GetNotesRequestQuery = z.object({
  documentIds: DocumentIds.optional(),
  savedObjectIds: SavedObjectIds.optional(),
  page: z.string().nullable().optional(),
  perPage: z.string().nullable().optional(),
  search: z.string().nullable().optional(),
  sortField: z.string().nullable().optional(),
  sortOrder: z.string().nullable().optional(),
  filter: z.string().nullable().optional(),
});
export type GetNotesRequestQueryInput = z.input<typeof GetNotesRequestQuery>;

export type GetNotesResponse = z.infer<typeof GetNotesResponse>;
export const GetNotesResponse = z.union([GetNotesResult, z.object({})]);
