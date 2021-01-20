// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import {
  ProductListItemSimpleFragment,
  ProductListItemSimpleFragmentDoc,
} from '../../magento-product-simple/ProductListItemSimple.gql'
import {
  ProductListItemVirtualFragment,
  ProductListItemVirtualFragmentDoc,
} from '../../magento-product-virtual/ProductListItemVirtual.gql'
import {
  ProductListItemFragmentDoc,
  ProductListItem_VirtualProduct_Fragment,
  ProductListItem_SimpleProduct_Fragment,
  ProductListItem_DownloadableProduct_Fragment,
  ProductListItem_BundleProduct_Fragment,
  ProductListItem_GroupedProduct_Fragment,
  ProductListItem_ConfigurableProduct_Fragment,
} from '../../magento-product/ProductListItem/ProductListItem.gql'

export const BundleItemsFragmentDoc: DocumentNode<BundleItemsFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BundleItems' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BundleProduct' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'ship_bundle_items' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dynamic_sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dynamic_price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'dynamic_weight' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'option_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                { kind: 'Field', name: { kind: 'Name', value: 'required' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'options' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'can_change_quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'is_default' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'position' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price_type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'uid' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ProductListItem' },
                            },
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ProductListItemSimple' },
                            },
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ProductListItemVirtual' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...ProductListItemFragmentDoc.definitions,
    ...ProductListItemSimpleFragmentDoc.definitions,
    ...ProductListItemVirtualFragmentDoc.definitions,
  ],
}
export type BundleItemsFragment = Pick<
  Types.BundleProduct,
  'ship_bundle_items' | 'dynamic_sku' | 'dynamic_price' | 'dynamic_weight'
> & {
  items?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.BundleItem, 'option_id' | 'position' | 'required' | 'sku' | 'title' | 'type'> & {
          options?: Types.Maybe<
            Array<
              Types.Maybe<
                Pick<
                  Types.BundleItemOption,
                  | 'can_change_quantity'
                  | 'id'
                  | 'is_default'
                  | 'label'
                  | 'position'
                  | 'price'
                  | 'price_type'
                  | 'quantity'
                  | 'uid'
                > & {
                  product?: Types.Maybe<
                    | ({ __typename: 'VirtualProduct' } & Pick<Types.VirtualProduct, 'id'> &
                        ProductListItem_VirtualProduct_Fragment &
                        ProductListItemVirtualFragment)
                    | ({ __typename: 'SimpleProduct' } & Pick<Types.SimpleProduct, 'id'> &
                        ProductListItem_SimpleProduct_Fragment &
                        ProductListItemSimpleFragment)
                    | ({ __typename: 'DownloadableProduct' } & Pick<
                        Types.DownloadableProduct,
                        'id'
                      > &
                        ProductListItem_DownloadableProduct_Fragment)
                    | ({ __typename: 'BundleProduct' } & Pick<Types.BundleProduct, 'id'> &
                        ProductListItem_BundleProduct_Fragment)
                    | ({ __typename: 'GroupedProduct' } & Pick<Types.GroupedProduct, 'id'> &
                        ProductListItem_GroupedProduct_Fragment)
                    | ({ __typename: 'ConfigurableProduct' } & Pick<
                        Types.ConfigurableProduct,
                        'id'
                      > &
                        ProductListItem_ConfigurableProduct_Fragment)
                  >
                }
              >
            >
          >
        }
      >
    >
  >
}