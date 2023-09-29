import React from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { useControllableValue } from '@kai/hooks';

export interface MenuProps {
  ref?: React.Ref<any>;
  children?: React.ReactNode;
}

export type UseMenuResult = ReturnType<typeof useMenu>;

export const MenuContext = React.createContext<UseMenuResult | null>(null);

const RootInner = (props: MenuProps, propRef) => {
  const menu = useMenu({
    ref: propRef,
  });

  const {
    nodeId,
    state,
    triggerRef,
    elementsRef,
    labelsRef,
    floating,
    interactions,
  } = menu;

  return (
    <FloatingNode id={nodeId}>
      <button
        type="button"
        ref={triggerRef}
        role={state.isNested ? 'menuitem' : undefined}
        {...interactions.getReferenceProps()}
      >
        Click
        {state.isNested && (
          <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
            ▶
          </span>
        )}
      </button>

      <MenuContext.Provider value={menu}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {state.isOpen && (
            <FloatingPortal>
              <FloatingFocusManager
                modal={false}
                context={floating.context}
                initialFocus={state.isNested ? -1 : 0}
                returnFocus={!state.isNested}
              >
                <div
                  ref={floating.refs.setFloating}
                  style={floating.floatingStyles}
                  {...interactions.getFloatingProps()}
                >
                  {props.children}
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingList>
      </MenuContext.Provider>
    </FloatingNode>
  );
};

export const useMenu = (options: MenuProps = {}) => {
  const [isOpen, setIsOpen] = useControllableValue<boolean>({});
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const elementsRef = React.useRef<HTMLElement[]>([]);
  const labelsRef = React.useRef<string[]>([]);

  const isNested = parentId !== null;

  const floating = useFloating<HTMLButtonElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? 'right-start' : 'bottom-start',
    middleware: [
      offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { context } = floating;

  const hover = useHover(context, {
    enabled: isNested,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    event: 'mousedown',
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const interactions = useInteractions([
    hover,
    click,
    role,
    dismiss,
    listNavigation,
    typeahead,
  ]);

  const triggerRef = useMergeRefs([
    floating.refs.setReference,
    item.ref,
    options.ref,
  ]);

  return React.useMemo(() => {
    return {
      nodeId,
      tree,
      interactions,
      floating,
      elementsRef,
      labelsRef,
      triggerRef,
      state: {
        isOpen,
        activeIndex,
        setIsOpen,
        setActiveIndex,
        isNested,
      },
    };
  }, [
    activeIndex,
    floating,
    interactions,
    isNested,
    isOpen,
    nodeId,
    setIsOpen,
    tree,
    triggerRef,
  ]);
};

export const useMenuContext = () => {
  return React.useContext(MenuContext);
};

export const Root = React.forwardRef(RootInner);
