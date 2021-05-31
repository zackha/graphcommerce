import { useQuery, TypedDocumentNode, QueryHookOptions } from '@apollo/client'
import { useCurrentCartId } from './useCartId'

/**
 * Requires the query to have a `$cartId: String!` argument. It will automatically inject the
 * currently active cart_id.
 *
 * Example:
 *
 * ```tsx
 * const { data } = useCartQuery(CartFabQueryDocument)
 * ```
 */
export function useCartQuery<Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options?: QueryHookOptions<Q, Omit<V, 'cartId'>>,
) {
  const cartId = useCurrentCartId()

  return useQuery(document, {
    ...options,
    variables: { cartId, ...options?.variables } as V,
    skip: !cartId,
    ssr: false,
  })
}